
/*
 * PARKED dev-only styling fixture -- not wired up. kept so chat-transcript
 * styling can be re-exercised later without an API key or reconstructing a
 * conversation. it is not imported anywhere, so it's tree-shaken out entirely.
 *
 * a canned OpenAI-responses transcript (real output with the b64 screenshot
 * payloads and encrypted reasoning traces stripped -- reasoning / function_call
 * / function_call_output items render to nothing anyway; see the
 * openai-responses branch in chat-messages.tsx, they're kept only so the shape
 * stays realistic).
 *
 * TO RE-ENABLE (`/<doc>?ai-sample` on the dev server seeds this + opens the
 * panel):
 *
 * 1. in ./util.ts, replace the localStorage hydrate at the top of
 *    InitMessages() with a dev fork:
 *
 *      const useDevSample =
 *        import.meta.env.DEV &&
 *        typeof window !== 'undefined' &&
 *        new URLSearchParams(window.location.search).has('ai-sample');
 *      if (useDevSample) {
 *        import('./dev-sample-chat').then(m => Object.assign(messages, m.sampleChat));
 *      } else {
 *        // ...existing localStorage load + persistence effect...
 *      }
 *
 * 2. in src/routes/[...document_path].tsx, auto-open the panel on mount
 *    (also add `onMount` to the solid-js import):
 *
 *      onMount(() => {
 *        if (import.meta.env.DEV &&
 *            new URLSearchParams(window.location.search).has('ai-sample')) {
 *          setSidebar('ai');
 *        }
 *      });
 */

import type { TypedChatMessages } from '~/lib/raw-llm-support';

export const sampleChat: TypedChatMessages = {
  type: 'openai-responses',
  messages: [
    {
      role: 'user',
      content: 'Hi Luna can you explain what this model is doing?',
    },
    {
      id: 'rs_09ff4df8c9bd9e34006a82563f098081999a09660e4bd43712',
      type: 'reasoning',
      content: [],
      encrypted_content: 'REMOVED',
      summary: [],
    },
    {
      id: 'fc_09ff4df8c9bd9e34006a82563f635881999d322f0fb0815da7',
      type: 'function_call',
      status: 'completed',
      arguments: '{}',
      call_id: 'call_ek4qi5ZfeyXGkRrTbJYeMFvu',
      name: 'list_sheets',
    },
    {
      id: 'fc_09ff4df8c9bd9e34006a82563f636c819995cd204ab47bde19',
      type: 'function_call',
      status: 'completed',
      arguments: '{"sheets":null}',
      call_id: 'call_JVKNhJq9TrA1Spg29z2JYAy8',
      name: 'get_spreadsheet',
    },
    {
      type: 'function_call_output',
      call_id: 'call_ek4qi5ZfeyXGkRrTbJYeMFvu',
      output: '{"sheets":[{"name":"Sheet1"}]}',
    },
    {
      type: 'function_call_output',
      call_id: 'call_JVKNhJq9TrA1Spg29z2JYAy8',
      output: '{"Sheet1":{"cells":{"B2":"min","B3":"most likely","B4":"max","B6":"PERT","B8":"Triangular","B11":"min","B12":"most likely","B13":"max","B15":"PERT","B17":"Triangular","B20":"min","B21":"most likely","B22":"max","B24":"PERT","B26":"Triangular","C2":300,"C3":700,"C4":1000,"C6":{"value":"=PERTValue(C2, C3, C4)","calculated":745.8039002668049},"C8":{"value":"=TriangularValue(C2, C3, C4)","calculated":684.6157962672451},"C11":300,"C12":900,"C13":1000,"C15":{"value":"=PERTValue(C11, C12, C13)","calculated":709.7357298644752},"C17":{"value":"=TriangularValue(C11, C12, C13)","calculated":744.4470510896346},"C20":300,"C21":1000,"C22":1000,"C24":{"value":"=PERTValue(C20, C21, C22)","calculated":947.3132649467791},"C26":{"value":"=TriangularValue(C20, C21, C22)","calculated":806.850716567989},"E6":{"value":"=Sparkline.Column(SimulationHistogram(C6, 20, FALSE))","calculated":"DATA"},"E8":{"value":"=Sparkline.Column(SimulationHistogram(C8, 20, FALSE))","calculated":"DATA"},"E15":{"value":"=Sparkline.Column(SimulationHistogram(C15, 20, FALSE))","calculated":"DATA"},"E17":{"value":"=Sparkline.Column(SimulationHistogram(C17, 20, FALSE))","calculated":"DATA"},"E24":{"value":"=Sparkline.Column(SimulationHistogram(C24, 20, FALSE))","calculated":"DATA"},"E26":{"value":"=Sparkline.Column(SimulationHistogram(C26, 20, FALSE))","calculated":"DATA"},"G4":"Skewness","G6":{"value":"=SimulationSkewness(C6)","calculated":"DATA"},"G8":{"value":"=SimulationSkewness(C8)","calculated":"DATA"},"G13":"Skewness","G15":{"value":"=SimulationSkewness(C15)","calculated":"DATA"},"G17":{"value":"=SimulationSkewness(C17)","calculated":"DATA"},"G22":"Skewness","G24":{"value":"=SimulationSkewness(C24)","calculated":"DATA"},"G26":{"value":"=SimulationSkewness(C26)","calculated":"DATA"}}}}',
    },
    {
      id: 'rs_09ff4df8c9bd9e34006a825641b02481998512490964d03b34',
      type: 'reasoning',
      content: [],
      encrypted_content: 'REMOVED',
      summary: [],
    },
    {
      id: 'msg_09ff4df8c9bd9e34006a825643a8c481999a848bd643a5f1a5',
      type: 'message',
      status: 'completed',
      content: [
        {
          type: 'output_text',
          annotations: [],
          logprobs: [],
          text: 'This workbook is a small **probability-distribution comparison model**. It compares **PERT** and **Triangular** random values under three sets of assumptions.\n\n### Structure\n\nEach scenario provides:\n\n- **Minimum**\n- **Most likely value**\n- **Maximum**\n\nThe scenarios are:\n\n1. **300 / 700 / 1,000**\n2. **300 / 900 / 1,000**\n3. **300 / 1,000 / 1,000**\n\n### Random outputs\n\nThe formulas in column C generate one random sample:\n\n- `PERTValue(min, most likely, max)`\n- `TriangularValue(min, most likely, max)`\n\nFor example, `C6` generates a PERT-distributed value using the assumptions in `C2:C4`.\n\nThese values are stochastic, so they can change whenever the model recalculates or a simulation runs.\n\n### Simulation analysis\n\nFor each distribution, the model also calculates:\n\n- A **20-bucket simulation histogram**, displayed as a column sparkline in column E\n- **Simulation skewness**, shown in column G\n\nThe histogram formulas use:\n\n```excel\n=Sparkline.Column(SimulationHistogram(C6, 20, FALSE))\n```\n\nThe skewness formulas use:\n\n```excel\n=SimulationSkewness(C6)\n```\n\nAt the moment, those analysis cells show `DATA` because a Monte Carlo simulation has not yet been run, or the referenced cells were not included in the previous simulation.\n\n### What the model is intended to show\n\nIt illustrates how the choice between **PERT** and **Triangular** distributions affects the shape and asymmetry of uncertain values:\n\n- PERT generally produces a smoother distribution concentrated around the most likely value.\n- Triangular distributions place more weight directly around the specified minimum, mode, and maximum.\n- Moving the most likely value from 700 to 900 to 1,000 shifts the distribution toward the upper bound and changes its skewness.\n\nThere is no downstream financial or operational calculation here—the workbook is primarily a demonstration of distribution sampling and simulation analysis.',
        },
      ],
      phase: 'final_answer',
      role: 'assistant',
    },
    {
      role: 'user',
      content: 'can you run a simulation?',
    },
    {
      id: 'rs_09ff4df8c9bd9e34006a82565232808199a41821b0a17b2f82',
      type: 'reasoning',
      content: [],
      encrypted_content: 'REMOVED',
      summary: [],
    },
    {
      id: 'fc_09ff4df8c9bd9e34006a82565276dc8199832b93c1458007ed',
      type: 'function_call',
      status: 'completed',
      arguments: '{"trials":null,"sampling_method":null,"seed":null,"screen_updates":false}',
      call_id: 'call_xrThRSAuu5MzseeeViWLqY06',
      name: 'run_simulation',
    },
    {
      type: 'function_call_output',
      call_id: 'call_xrThRSAuu5MzseeeViWLqY06',
      output: '""',
    },
    {
      id: 'rs_09ff4df8c9bd9e34006a825653b49c819983db3804130452fb',
      type: 'reasoning',
      content: [],
      encrypted_content: 'REMOVED',
      summary: [],
    },
    {
      id: 'fc_09ff4df8c9bd9e34006a825653ffd88199b968a51c2b7587a8',
      type: 'function_call',
      status: 'completed',
      arguments: '{"reference":["C6:C8","C15:C17","C24:C26","E6:E26","G6:G26"],"values":true,"formulas":true,"formatted":false}',
      call_id: 'call_uYBybN6BQewezt5J7RKPWkzt',
      name: 'get_cells',
    },
    {
      type: 'function_call_output',
      call_id: 'call_uYBybN6BQewezt5J7RKPWkzt',
      output: '{"C6:C8":{"values":[[553.7729479158027],[null],[578.6733474731184]],"formulas":[["=PERTValue(C2, C3, C4)"],[null],["=TriangularValue(C2, C3, C4)"]]},"C15:C17":{"values":[[551.812751731413],[null],[846.9916817575828]],"formulas":[["=PERTValue(C11, C12, C13)"],[null],["=TriangularValue(C11, C12, C13)"]]},"C24:C26":{"values":[[995.5183176010006],[null],[582.0066109716913]],"formulas":[["=PERTValue(C20, C21, C22)"],[null],["=TriangularValue(C20, C21, C22)"]]},"E6:E26":{"values":[[[[[0,0,0,1,24,95,203,333,462,571,646,674,644,559,425,260,98,5,0,0]]]],[null],[[[[0,0,0,11,90,178,267,358,446,537,624,688,596,475,358,238,119,15,0,0]]]],[null],[null],[null],[null],[null],[null],[[[[0,0,0,1,6,20,52,106,182,287,413,557,704,826,879,766,201,0,0,0]]]],[null],[[[[0,0,0,8,59,119,179,238,298,356,417,477,535,595,655,662,357,45,0,0]]]],[null],[null],[null],[null],[null],[null],[[[[0,0,0,0,1,4,13,28,62,113,191,308,466,684,967,1332,831,0,0,0]]]],[null],[[[[0,0,0,6,52,101,154,204,254,307,357,409,458,511,560,613,663,351,0,0]]]]],"formulas":[["=Sparkline.Column(SimulationHistogram(C6, 20, FALSE))"],[null],["=Sparkline.Column(SimulationHistogram(C8, 20, FALSE))"],[null],[null],[null],[null],[null],[null],["=Sparkline.Column(SimulationHistogram(C15, 20, FALSE))"],[null],["=Sparkline.Column(SimulationHistogram(C17, 20, FALSE))"],[null],[null],[null],[null],[null],[null],["=Sparkline.Column(SimulationHistogram(C24, 20, FALSE))"],[null],["=Sparkline.Column(SimulationHistogram(C26, 20, FALSE))"]]},"G6:G26":{"values":[[-0.1266815774385714],[null],[-0.1382137767561031],[null],[null],[null],[null],["Skewness"],[null],[-0.7162152672376582],[null],[-0.5217308067016979],[null],[null],[null],[null],["Skewness"],[null],[-1.1823474263968645],[null],[-0.5657119503575959]],"formulas":[["=SimulationSkewness(C6)"],[null],["=SimulationSkewness(C8)"],[null],[null],[null],[null],["Skewness"],[null],["=SimulationSkewness(C15)"],[null],["=SimulationSkewness(C17)"],[null],[null],[null],[null],["Skewness"],[null],["=SimulationSkewness(C24)"],[null],["=SimulationSkewness(C26)"]]}}',
    },
    {
      id: 'msg_09ff4df8c9bd9e34006a82565586cc8199985d9053cc56d66b',
      type: 'message',
      status: 'completed',
      content: [
        {
          type: 'output_text',
          annotations: [],
          logprobs: [],
          text: 'Simulation complete using the workbook’s default settings.\n\nThe histogram and skewness outputs are now populated:\n\n- Scenario 1:\n  - PERT skewness: **-0.127**\n  - Triangular skewness: **-0.138**\n- Scenario 2:\n  - PERT skewness: **-0.716**\n  - Triangular skewness: **-0.522**\n- Scenario 3:\n  - PERT skewness: **-1.182**\n  - Triangular skewness: **-0.566**\n\nThe increasingly negative skewness reflects the most-likely value moving toward the maximum of 1,000. The histogram sparklines in column E now show the simulated distribution shapes.',
        },
      ],
      phase: 'final_answer',
      role: 'assistant',
    },
    {
      role: 'user',
      content: 'Do the sparklines look correct?',
    },
    {
      id: 'rs_09ff4df8c9bd9e34006a8256639cac8199b0e6348f14299e15',
      type: 'reasoning',
      content: [],
      encrypted_content: 'REMOVED',
      summary: [],
    },
    {
      id: 'fc_09ff4df8c9bd9e34006a825663e89c8199b8629ebcf73ae47f',
      type: 'function_call',
      status: 'completed',
      arguments: '{}',
      call_id: 'call_j0lVoGwD3T14qkm1EjBeRdVW',
      name: 'get_screenshot',
    },
    {
      type: 'function_call_output',
      call_id: 'call_j0lVoGwD3T14qkm1EjBeRdVW',
      output: [
        {
          type: 'input_image',
          image_url: 'REMOVED',
        },
        {
          type: 'input_text',
          text: '{"active_sheet":"Sheet1","user_selection":"Sheet1!I10"}',
        },
      ],
    },
    {
      id: 'rs_09ff4df8c9bd9e34006a82566557808199b9e244adf6d7d219',
      type: 'reasoning',
      content: [],
      encrypted_content: 'REMOVED',
      summary: [],
    },
    {
      id: 'msg_09ff4df8c9bd9e34006a825666cc9c8199b81dcbded179c6b1',
      type: 'message',
      status: 'completed',
      content: [
        {
          type: 'output_text',
          annotations: [],
          logprobs: [],
          text: 'Yes—the sparklines look correct and are consistent with the assumptions:\n\n- **Scenario 1:** Both distributions are centered around the 700 mode, with mild left skew.\n- **Scenario 2:** Both shift toward 900, producing a visibly stronger left-skewed shape.\n- **Scenario 3:**  \n  - **PERT** is heavily concentrated near 1,000, as expected when the most likely value equals the maximum.\n  - **Triangular** rises steadily toward 1,000, which is the expected triangular shape when the mode equals the maximum.\n\nThe displayed values in column C are only single random draws; the sparklines represent the full simulation distributions.',
        },
      ],
      phase: 'final_answer',
      role: 'assistant',
    },
  ],
} as TypedChatMessages;
