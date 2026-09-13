
import { Accessor, Component, createSignal, mergeProps, ParentProps, Setter } from 'solid-js'

// import using css modules, will scope
import style from "./splitter.module.css";
// import shared from "../../style/shared.module.css";

interface Props {

  /** initial split if you let splitter handle its own split (you are not using bind) */
  initial?: number;

  /** width of the splitter element. we'll draw a line in the middle using --splitter-color */
  'splitter-width'?: number;

  /** min value */
  min?: number;

  /** max value */
  max?: number;

  /** threshold; above this value we hide the right panel */
  threshold?: number;

  split: Accessor<number>;
  setSplit: Setter<number>;
  
  /** split vertically (the panels are vertically stacked) */
  vertical?: boolean;

}

const default_props = {
  'splitter-width': 31,
  threshold: 100,
};

export const Splitter: Component<ParentProps<Props>> = (props) => {

  const resolved = mergeProps(
    default_props, 
    props,
  );

  const [dragging, setDragging] = createSignal(false);

  // let mouse_mask: HTMLDivElement|undefined;

  // eslint-disable-next-line no-unassigned-vars
  let container: HTMLDivElement|undefined;

  const computed_style = () => {
    if (props.vertical) {
      if (props.split() > resolved.threshold) {
        return {
          'grid-template-rows': 
            `1fr 0px 0px`,
        };
      }
      return {
        'grid-template-rows': `calc(${props.split()}% - ${resolved['splitter-width']/2}px) ${resolved['splitter-width']}px 1fr`,
      };
    }
    else {
      if (props.split() > resolved.threshold) {
        return {
          'grid-template-columns': 
            `1fr 0px 0px`,
        };
      }
      return {
        'grid-template-columns': `calc(${props.split()}% - ${resolved['splitter-width']/2}px) ${resolved['splitter-width']}px 1fr`,
      };
    }
  };

  const right_hidden = () => (props.split() > resolved.threshold);
  const splitter_hidden = () => right_hidden();

  const container_bounds = {
    x: 0, width: 0,
    y: 0, height: 0,
  };

  let delta = 0;

  function StartDrag(event: PointerEvent) {

    event.stopPropagation();
    event.preventDefault();

    if (container) {

      container.setPointerCapture(event.pointerId);
      container.addEventListener('pointermove', MouseMove);
      container.addEventListener('pointerup', EndDrag);

      const bounds = container.getBoundingClientRect();
      container_bounds.x = bounds.x;
      container_bounds.y = bounds.y;
      container_bounds.width = bounds.width;
      container_bounds.height = bounds.height;

      const p = props.vertical ? 
        (event.clientY - container_bounds.y) / container_bounds.height :
        (event.clientX - container_bounds.x) / container_bounds.width ;

      delta = props.split() - (p * 100);
      setDragging(true);

    }
  }

  function EndDrag(event: PointerEvent) {
    event.stopPropagation();
    event.preventDefault();

    if (container) {
      container.releasePointerCapture(event.pointerId);
      container.removeEventListener('pointermove', MouseMove);
      container.removeEventListener('pointerup', EndDrag);
    }

    setDragging(false);
  }

  function MouseMove(event: PointerEvent) {
    if (dragging()) {    
      if (!event.buttons) {
        EndDrag(event);
      }
      else {
        const p = props.vertical ?
          (event.clientY - container_bounds.y) / container_bounds.height :
          (event.clientX - container_bounds.x) / container_bounds.width ;
        props.setSplit(Math.min(resolved.max ?? 100, Math.max(resolved.min ?? 0, p * 100 + delta)));
      }
    }
  }

  return <>
    <div classList={{
      [style['splitter-container']]: true,
      [style['resize-horizontal']]: dragging() && !props.vertical,
      [style['resize-vertical']]: dragging() && props.vertical,
      [style['right-hidden']]: right_hidden(),
      [style['splitter-hidden']]: splitter_hidden(),
      [style.vertical]: props.vertical,
     }} style={computed_style()} ref={container}>
      {resolved.children}
      <div data-splitter 
          onpointerdown={(event) => StartDrag(event)}
          classList={{
            hot: dragging()
          }}
          >
      </div>
      {/*
      <div classList={{
        [shared['mouse-mask']]: true,
        [style['mouse-mask']]: true,
        [style.visible]: dragging(),
       }}
       onmouseup={EndDrag}
       onmousemove={MouseMove}
       ref={mouse_mask}></div>
       */}
    </div>
  </>;
};

