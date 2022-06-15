import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from 'react-query'
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'

import App from './App'
import * as serviceWorker from './serviceWorker'
import theme from '../renderer/lib/theme'
import { queryClient } from '../renderer/lib/queryClient'
import Frame from '../renderer/components/Frame'
import SnackbarCustom from '../renderer/components/SnackbarCustom'

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
<QueryClientProvider client={queryClient}>
  <ThemeProvider theme={theme}>
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <Frame getTimerStatus={false} />
      <SnackbarCustom />
      <App />
    </StyledEngineProvider>
  </ThemeProvider>
</QueryClientProvider>);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()