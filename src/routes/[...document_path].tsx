

import { Title } from "@solidjs/meta";

import { useParams } from "@solidjs/router";
import { useSearchParams } from "@solidjs/router";

import { Spreadsheet } from '~/components/spreadsheet/spreadsheet';
import { createEffect, createSignal, on } from 'solid-js';
import { Splitter } from '~/components/splitter/splitter';
import { Toolbar } from '~/components/toolbar/toolbar';
import { ToolbarCommand, ToolbarCommandKey } from '~/components/toolbar/toolbar-commands';
import type { SpreadsheetType } from '~/lib/spreadsheet-type';
import { Sidebar } from '~/components/sidebar/sidebar-main';
import { goto, OpenExternal } from '~/lib/navigate';

import { RunSimulationDialog, type Options as RunSimulationOptions } from '~/components/dialogs/run-simulation-dialog/run-simulation-dialog';
import { SparklineDialog } from '~/components/dialogs/sparkline-dialog/sparkline-dialog';
import { InsertFunctionDialog } from '~/components/dialogs/insert-function-dialog/insert-function-dilalog';
import { Dialog as LasVegasDialog, props as las_vegas_props } from '~/components/dialogs/las-vegas-simulation/las-vegas-simulation';

import { HijackDialog } from '~/lib/hijack-dialog';
import { ApplyProperty, BooleanKeys } from '~/lib/typescript-magic';
import { MCEmbeddedSheetEvent, type CellStyle, type Color } from 'riskamp-web';
import { AwaitSignal } from '~/lib/await-signal';
import { InsertSparkline, sparkline_props } from '~/components/dialogs/sparkline-dialog/sparkline';
import { TrendForecastingDialog } from '~/components/dialogs/trend-forecasting/trend-forecasting-dialog';
import { RunTrendForecast, trend_forecast_props } from '~/components/dialogs/trend-forecasting/trend-forecasting';
import { BorderConstants, EmbeddedSheetEvent } from '@trebco/treb';
import { sessionData, setPersistentData, setSessionData } from '~/lib/app-data';

import { CacheCUrrentState, RemoveFromCache, RevertDocument, TryLoadPath } from '~/components/spreadsheet/manager';
import { CheckFunction, CheckFunctionData, RestoreEditor } from '~/components/dialogs/insert-function-dialog/check-function';
import { produce } from 'solid-js/store';
import { GenerateFilename } from '~/lib/filename-util';
import { SetTheme } from '~/components/toolbar/theme-selector';

import { SaveAsDialog, SaveAsDocument, SaveAsResult } from '~/components/dialogs/save-as-dialog/save-as-dialog';
import { documents } from '~/backstage/documents-store';
import { folderOf, isValidPath, loadDocuments, ownerOf, pathOf, slugOf, upsertDocument } from '~/backstage/documents-data';
import { loggedIn, session } from '~/lib/auth';
import { spinner } from '~/components/spinner/spinner-control';
import { toast } from '~/components/toast/toast-control';
import { t, format } from '~/i18n/i18n';
import { StoreDocument, UpdateDocument } from '~/docs/documents2';

// we should drop that old goto utility, unless someone needs
// to call it from code

import { useNavigate } from "@solidjs/router";
import { DocumentsRow } from '~/docs/documents';

/*
function Spin() {
  spinner.show();
  setTimeout(() => {
    spinner.hide();
  }, 4000);
}
*/

export default function Page() {

  const params = useParams() as { document_path: string|undefined };
  const [searchParams, setSearchParams] = useSearchParams();

  const [split, setSplit] = createSignal(100);
  const [getSheet, setSheet] = createSignal<SpreadsheetType|undefined>();
  const [sidebar, setSidebar] = createSignal<string|undefined>();

  const [saveAsDialogOpen, setSaveAsDialogOpen] = createSignal(false);
  const [saveAsDocument, setSaveAsDocument] = createSignal<SaveAsDocument|undefined>();

  const [runSimulationOpen, setRunSimulationOpen] = createSignal(false);
  const [runSimulationOptions, setRunSimulationOptions] = createSignal<Partial<RunSimulationOptions>>({});
  const [insertFunctionDialogOpen, setInsertFunctionDialogOpen] = createSignal(false);
  const [insertFunctionData, setInsertFunctionData] = createSignal<(CheckFunctionData & { result?: string })|undefined>(undefined);
  const [functionResult, setFunctionResult] = createSignal<string|undefined>('');

  const [pageTitle ] = createSignal('RiskAMP web');

  const navigate = useNavigate();

  // const RunSimulationSignal = createSignal(false);
  // const [auto, setAuto] = createSignal(false);
  // const [additionalCells, setAdditionalCells] = createSignal<string[]>([]);

  /**
   * listen for path changes, and (try to) load. we'll handle the 
   * intiial path when we create the spreadsheet, so this is deferred.
   */
  createEffect(on(() => params.document_path, value => {
    TryLoadPath(getSheet(), value, searchParams.version);
  }, { defer: true }));

  createEffect(on(() => searchParams.version, value => {
    TryLoadPath(getSheet(), params.document_path, value);
  }, { defer: true }));

  function ToggleStyle(sheet: SpreadsheetType, name: BooleanKeys<CellStyle>) {
    let value = false;
    if (sheet.selection_state?.style) {
      value = sheet.selection_state.style[name] || false;
    }
    sheet.ApplyStyle(undefined, { [name]: !value });
    sheet.Focus();
  }

  async function NewDocument() {

    if (params.document_path) {
      goto('/');
    }

    // TOOD: path

    // TODO: alert

    getSheet()?.Reset();

  }

  async function LasVegasSimulation() {
    las_vegas_props.setOpen(true);
    await AwaitSignal(las_vegas_props.open, value => !value);
    getSheet()?.Focus();
  }

  /**
   * run the save or save-as routine. save-as always shows a dialog;
   * save does not, unless there's no existing file/path, in which case
   * it's the same as save-as.
   * 
   * @param save_as 
   */
  async function Save(save_as = false) {

    const sheet = getSheet();

    if (!sheet || !loggedIn()) {
      return;
    }

    // regular save. there must already be a path, and the owner
    // will have to match. if those conditions are met we can save
    // the document as-is, as an updated version.

    if (!save_as && params.document_path && isValidPath(params.document_path)) {

      // check if the current user owns the document. if not,
      // we'll need to run the save-as flow (although we can
      // preserve the path name)

      const owner = ownerOf(params.document_path);
      if (owner.substring(1) === session().username) {

        // I suppose we should leave the API version and name/file
        // as is, since this is just updating a saved document...
        
        spinner.show();

        const result = await UpdateDocument(pathOf(params.document_path), {
          document: JSON.stringify(sheet.SerializeDocument({
            preserve_simulation_data: true,
          })),
        }, );
        
        // test failure case // const result = false;

        spinner.hide();

        if (!result) {

          // save failed; show error, allow retry
          toast.error(
            format(t('save-as-dialog.save-failed'), { name: params.document_path }), {
              action: { label: t('save-as-dialog.retry'), run: () => Save() }
            });
        }
        else {

          console.info({save_result: result});

          // update the documents list on the documents page (lazy)

          upsertDocument({
            path: params.document_path,
            version: result.version || 1,
            modified: result.modified,
          }, {
            history: 'record',
          })

          if (searchParams.version) {

            // if there's a version, we can remove the cached entry for 
            // that version. we're about to dump the parameter, so do that
            // first

            RemoveFromCache(params.document_path, searchParams.version);

            // remove the tag from the URL. in this operation we want (1) to
            // prevent any actual navigation, and (2) to ensure we're pushing 
            // a history entry so the back button returns to the older document.

            setSearchParams(
              { version: undefined },
              { resolve: false },
            );

          }

          // update the canonical version, and update cache

          setSessionData('last_saved_version', sheet.state);
          CacheCUrrentState(sheet, params.document_path);
          
          toast.success(format(t('save-as-dialog.saved'), { name: params.document_path }));

        }

        sheet.Focus();
        return;

      } // owner check. if this failed, drop into the save-as flow

    } // path check
   
    // either this is an explicit save-as, or there's no path, or there
    // was a username mismatch. in any event we can start the save-as flow.
    // what changes is how we handle document matching and populating 
    // fields. that also changes based on API version

    // ew're loading the documents list here so we can report collisions. not
    // sure if we should wait for it...

    loadDocuments();

    // note that the ignorePath field should only be used for renaming.
    // we're not using that here in any branch (I think this makes sense?)

    const user_data = sheet.user_data || {};
    const sad: SaveAsDocument = {};

    // explicit save-as: no path info, but persist name (if it exists)
    if (save_as) {
      if (sheet.document_name) {
        sad.name = sheet.document_name;
      }
    }
    // otherwise: use as much as we can
    else {  

      // explicit name and folder. there should never be 
      // a folder without a name, but we'll handle the edge
      // case regardless

      if (sheet.document_name) {
        sad.name = sheet.document_name;
      }
      if (user_data.folder) {
        sad.folder = user_data.folder;
      }

      // if we have nothing, try to populate based on the 
      // existing path (if any)

      if (!sad.name && !sad.folder) {
        if (params.document_path) {
          sad.name = slugOf(params.document_path);
          sad.folder = folderOf(params.document_path);
        }
      }

    }

    setSaveAsDocument(sad);
    setSaveAsDialogOpen(true); // show
    AwaitSignal(saveAsDialogOpen, open => !open);
    sheet.Focus();

  }

  async function HandleSaveAs(result: SaveAsResult) {

    const sheet = getSheet();
    if (sheet) {

      // there's one case where this gets jumpy that we need to resolve.
      // if you say "save as", on a clean document (perhaps you don't own
      // it or you want to save a copy), when we update the name/user data
      // we'll bump the state/version. this will result in the dirty pill
      // showing in the UI, then disappearing when/if the file is actually
      // saved.

      // we should be able to handle this by updating the canonical version
      // now (or immediately after we make changes), and reverting it in the 
      // event save failed. in fact we should roll back the changes in that
      // case regardless (maybe? not sure)

      // BUT WAIT -- that should only happen if the current state is clean.
      // if the current state is dirty, then we want it to stay dirty until
      // the save is successful, for the same reason (but inverted), it will
      // be jumpy.

      // set the name and folder in the sheet's user data space in
      // pretty form

      let name = result.name;
      let folder = '';

      let index = result.name.lastIndexOf('/');
      if (index >= 0) {
        name = result.name.substring(index + 1);
        folder = result.name.substring(0, index);
      }

      const user_data = sheet.user_data || {};
      user_data.folder = folder;
      user_data.raw_api_version = 2;

      // cache so we can revert if necessary. only do this is the document
      // is clean, as noted above.

      let cached_version = -1; 
      if (sessionData.last_saved_version === sheet.state) {
        cached_version = sessionData.last_saved_version;
      }

      sheet.Batch(() => {
        sheet.user_data = user_data;
        sheet.document_name = name;
      });

      // update, but only if we need to stay clean

      if (cached_version >= 0) {
        setSessionData('last_saved_version', sheet.state);
      }

      spinner.show();

      const data = sheet.SerializeDocument({
        preserve_simulation_data: true,
        // ?
      });

      let pathname = result.path;
      index = result.path.indexOf('/');
      if (index >= 0) {
        pathname = result.path.substring(index + 1);
      }

      let store_result: Partial<DocumentsRow>|false|undefined;

      if (result.overwrite) {
        store_result = await UpdateDocument(pathname, {
          name: result.name,
          document: JSON.stringify(data),
          access: result.access === 0 ? 'private' : 'public',
          // we're not changing `starred` here
        });
      }
      else {
        store_result = await StoreDocument(pathname, result.name, JSON.stringify(data), result.access);
      }

      spinner.hide();

      if (store_result) {

        console.info({store_result});

        toast.success(format(t('save-as-dialog.saved'), { name }));

        // OK we need to change the active URL. that will trigger a reload,
        // so make sure the updated document and version are in the cache.

        // this is slightly broken, because it implies the last save version
        // for the _current_ URL. but the CCS method takes a path, so it 
        // will set it in the right place. hopefully.

        setSessionData('last_saved_version', sheet.state);
        CacheCUrrentState(sheet, result.path);

        // now we can update the path. resolve:false means don't try to
        // re-evaluate the path, but it will still push history 
        
        navigate(result.path, {
          resolve: false,
        });
        
      }
      else {

        // we should restore state... maybe? not sure. if we do, we should also
        // undo document changes. right? maybe that's not important

        // let the user retry the save rather than silently losing their work
        toast.error(format(t('save-as-dialog.save-failed'), { name }), {
          action: { label: t('save-as-dialog.retry'), run: () => HandleSaveAs(result) },
        });
      }

    }
  }

  // FIXME: move this to a lib file, it doesn't need to clog up this file
  function HandleCommand(command: ToolbarCommand) {

    const sheet = getSheet();
    if (!sheet) {
      return;
    }

    if (command?.key.startsWith('border-') && command.key !== 'border-color') {
      let border_command = command.key.substring(7);
      let width = 1;
      if (border_command.startsWith('double-')) {
        width = 2;
        border_command = border_command.substring(7);
      }
      sheet.ApplyBorders(undefined, border_command as BorderConstants, width);
      return;
    }

    const key = command.key as ToolbarCommandKey;

    switch (key) {
      case 'las-vegas-simulation':
        LasVegasSimulation();
        return;

      case 'new':
        NewDocument();
        break;

      case 'import':
        sheet.LoadLocalFile().then(() => {
          sheet.Focus();
        });
        return;
        break;

      case 'save':
      case 'save-as':
        Save(key === 'save-as');
        break;

      case 'save-to-desktop':

        // options? what are the defaults?
        sheet.SaveToDesktop(GenerateFilename(sheet, params.document_path) + '.json');
        break;

      case 'export-csv':
        sheet.SaveToDesktop(GenerateFilename(sheet, params.document_path) + '.csv');
        // sheet.SaveToDesktop('csv');
        break;

      case 'export-xlsx':
        sheet.Export(GenerateFilename(sheet, params.document_path));
        break;



      case 'forecast':
        RunTrendForecast(getSheet());
        break;

      case 'sparkline':
        InsertSparkline(getSheet());
        break;

      case 'function-docs':
        OpenExternal('https://docs.riskamp.com');
        break;

      case 'run-simulation':
      case 'run-simulation-again':
        {
          const options: Partial<RunSimulationOptions> = {};
          if (Array.isArray(command.additional_data)) {
            options.additional_cells = [...command.additional_data as string[]];
          }
          options.auto = (key === 'run-simulation-again');
          setRunSimulationOptions(options);
          setRunSimulationOpen(true);
        }
        break;

      case 'recalculate':
        sheet.Recalculate();
        break;

    case 'number-format':
      ApplyProperty(sheet, 'number_format', typeof command.value === 'string' ? command.value : undefined);
      break;

    case 'text-color':
    case 'fill-color':
    case 'border-color':
      {
        let color: Color|undefined;
        if (command.type === 'color') {
          color = command.active_color;
        }
        sheet.HandleToolbarMessage({
          command: key,
          color,
        });
      }
      break;

      case 'lock-cells':
        ToggleStyle(sheet, 'locked');
        break;

      case 'bold':
      case 'underline':
      case 'strike':
      case 'italic':
      case 'wrap':
        ToggleStyle(sheet, key);
        break;

      case 'font-scale':
        if (typeof command.value === 'string') {
          let scale = sheet.ParseNumber(command.value);
          if (typeof scale !== 'number' || !scale || isNaN(scale)) {
            scale = 1;
          }  
          sheet.HandleToolbarMessage({ command: 'font-scale', scale });
        }
        break;

      case 'toggle-grouping':
      case 'increase-precision':
      case 'decrease-precision':
      case 'insert-column-chart':
      case 'insert-bar-chart':
      case 'insert-line-chart':
      case 'insert-donut-chart':
      case 'insert-scatter-plot':
      case 'insert-image':
      case 'indent':
      case 'outdent':

        sheet.HandleToolbarMessage({ command: key });
        sheet.Focus();
        break;

      case 'insert-column':
        sheet.InsertColumns();
        sheet.Focus();
        break;

      case 'insert-row':
        sheet.InsertRows();
        sheet.Focus();
        break;

      case 'delete-column':
        sheet.DeleteColumns();
        sheet.Focus();
        break;

      case 'delete-row':
        sheet.DeleteRows();
        sheet.Focus();
        break;

      case 'merge-cells':
        if (sheet.selection_state.merge) {
          sheet.UnmergeCells();
        }
        else {
          sheet.MergeCells();
        }
        sheet.Focus();
        break;

      case 'align-left':
        ApplyProperty(sheet, 'horizontal_align', command.value ? undefined : 'left');
        sheet.Focus();
        break;

      case 'align-right':
        ApplyProperty(sheet, 'horizontal_align', command.value ? undefined : 'right');
        sheet.Focus();
        break;

      case 'align-center':
        ApplyProperty(sheet, 'horizontal_align', command.value ? undefined : 'center');
        sheet.Focus();
        break;

      case 'align-top':
        ApplyProperty(sheet, 'vertical_align', command.value ? undefined : 'top');
        sheet.Focus();
        break;

      case 'align-middle':
        ApplyProperty(sheet, 'vertical_align', command.value ? undefined : 'middle');
        sheet.Focus();
        break;

      case 'align-bottom':
        ApplyProperty(sheet, 'vertical_align', command.value ? undefined : 'bottom');
        sheet.Focus();
        break;

      case 'ai':
      case 'find':
      case 'names':
      case 'quick-view':
      case 'quick-view-correlation':
      case 'notes':
      case 'fit-data':  
      case 'simulation-settings':
        if (active_sidebar() === key) {
          setSidebar(undefined);
        }
        else {
          setSidebar(key);
        }
        break;

      case 'revert':
        RevertDocument(sheet, params.document_path);
        break;

      case 'walkthrough':
        goto(`/@riskamp/riskamp-walkthrough`);
        break;

      case 'dark-theme':
        SetTheme(sheet, 'dark');
        break;

      case 'light-theme':
        SetTheme(sheet, 'light');
        break;

      case 'system-theme':
        SetTheme(sheet, 'system');
        break;

      default:
        console.warn('unhandled', key);
        // setOpen(true);
    }

    sheet.Focus();

  }

  async function InsertFunction() {
    const sheet = getSheet();
    if (sheet) {
      const check = CheckFunction(sheet);
      if (check.reject) {
        RestoreEditor(sheet, check);
      }
      else {
        setFunctionResult(undefined);
        setInsertFunctionData({...check});
        setInsertFunctionDialogOpen(true);
        await AwaitSignal(insertFunctionDialogOpen, val => !val);
        RestoreEditor(sheet, check, functionResult());
      }
    }
  }

  /** 
   * effect on spreadsheet create. set up.
   */
  createEffect(on(getSheet, sheet => {
    if (sheet) {
      HijackDialog(sheet);

      TryLoadPath(sheet as SpreadsheetType, params.document_path || '', searchParams.version);

      sheet.Subscribe((event: EmbeddedSheetEvent|MCEmbeddedSheetEvent) => {

        // store updates in cache

        // NOTE: the load event here is unecessary if the document
        // comes from cache. can we flag that somehow?

        switch (event.type) {
          case 'load':

            console.info("LOAD", event.source);
            if (event.source as string !== 'cache') {
              console.info("setting last save version (not from cache) ->", sheet?.state || 0);
              setSessionData('last_saved_version', sheet?.state || 0);
            }

            if (sheet.user_data?.note) {
              setSidebar('notes');
            }

            // on load, check the workbook for a trials count
            // and use that if set

            {
              const user_data = sheet.user_data || {};
              if (user_data.simulation?.trials) {
                const trials = user_data.simulation.trials;
                setPersistentData(produce(s => { s.trials = trials; }));
              }

              if (event.path && (event.source === 'drag-and-drop' || event.source === 'local-file')) {
                user_data.imported_from = event.path;
                sheet.user_data = user_data;
              }

            }

          // case 'selection':
          // case 'annotation-selection':
          // case 'focus-view':
          // case 'view-change':

          // fall through

          case 'reset':

            if (event.type === 'reset') {
              setSessionData('last_saved_version', 0);
            }

            // on reset, we want to clear any saved seed



            // MAYBE: reset trials as well? or we can just use
            // the last setting

            // fall through

          case 'document-change':
          case 'simulation-complete':
          case 'simulation-aborted':
            // console.info("save on event", event.type);
            CacheCUrrentState(sheet, params.document_path || '', searchParams.version);
            break;

          // default:
          //  console.info("unhandled", event.type);
          
        }
      });
    }
  }));

  /** show the sidebar when you select one (if it's hidden) */
  createEffect(on(sidebar, (value) => {
    if (value) {
      if (split() >= 90) {
        setSplit(sessionData.last_split); 
      }
    }
    else {
      setSplit(100);
    }
  }));

  /** FIXME: this should be part of a larger app state */
  createEffect(on(split, value => {
      if (value >= 90) {
        // setSidebar(undefined);
      }
      else {
        setSessionData({ last_split: value });
      }
    }, 
    { defer: true }
  ));

  function active_sidebar() {

    // I guess this has to be the threshold... that's unfortunate, we
    // should either have a visible/hidden signal or make the threshold
    // set split -> max

    if (split() < 90) {
      return sidebar();
    }
    return undefined;
  }

  return (
    <main class="app">
      <Title>{pageTitle()}</Title>

      <div>
        <Toolbar oncommand={HandleCommand} 
                 document_path={params.document_path}
                 sidebar={active_sidebar} 
                 sheet={getSheet}/>
      </div>

      <div>
        <Splitter split={split} setSplit={setSplit} min={40} splitter-width={16} threshold={90}>
          <div data-left>
            <Spreadsheet fill 
                         setSheet={setSheet} 
                         function-handler={() => InsertFunction()}/>
          </div>
          <div data-right>
            <Sidebar bind={[sidebar, setSidebar]} 
                     sheet={getSheet} 
                     oncommand={HandleCommand} 
                     split={split} ></Sidebar>
          </div>
        </Splitter>
      </div>  

      <LasVegasDialog {...las_vegas_props} sheet={getSheet} />
      <SparklineDialog {...sparkline_props} sheet={getSheet} />
      <TrendForecastingDialog {...trend_forecast_props} sheet={getSheet} />

      <InsertFunctionDialog sheet={getSheet}
                            open={insertFunctionDialogOpen} 
                            setOpen={setInsertFunctionDialogOpen} 
                            data={insertFunctionData}
                            setFunctionResult={setFunctionResult}
                            />

      <RunSimulationDialog open={runSimulationOpen} 
                           setOpen={setRunSimulationOpen}
                           options={runSimulationOptions}
                           sheet={getSheet} />


      <SaveAsDialog
          open={saveAsDialogOpen}
          setOpen={setSaveAsDialogOpen}
          owner={() => '@' + (session().username || '')}
          documents={() => documents}
          document={saveAsDocument}
          onSave={HandleSaveAs} />

    </main>
  );
}
