import { Component } from '@angular/core';
// declare const nw: any; // TODO global declaration
// https://dev.to/thejaredwilcurt/angular-cli-and-nwjs-for-development-49gl

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  hideApp = false;
  win: any;
  timeout: any;
  constructor() {
    // console.log(window.nw);
    // console.log(window.fs);
    if (typeof window.nw !== 'undefined') {
      this.win = window.nw.Window.get();
      // this.win.showDevTools();

      const dir = window.fs.readdirSync('./');
      console.log(window.nw);
      console.log(dir);
      // this.watch();
    } else {
      this.hideApp = true;
    }
  }
  title = 'desktop-app';

  public reloadApp() { // DELETE
    alert('eh eh ');
    // location.reload();
    // window.nw.Window.get().reloadIgnoringCache();

/*     window.nw.Window.open(`D:/Work/playground/ng-desktop-app/dist/index.html`);
    // {new-instance: }
    console.log(window.cp);
    window.cp.exec('start nw .' , {cwd : '.'} , (error, stdout, stderr) => {
      console.log(error);
      console.log(stdout);
      console.log(stderr);
    });
    const nwjs = window.cp.spawn('nw .');

    nwjs.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });

    nwjs.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    nwjs.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
    // console.log(app);
    // this.win.window.location.reload(true);
    console.log(window.nw.App); */
  }

  private watch() { // DELETE no use of lite server now, just use node-remote with ng serve for dev
    console.log('lauching dev watch');
    const path = './dist';
    const index = `D:/Work/playground/ng-desktop-app/dist/index.html`;
    console.log('location : ' , location.pathname);
    const reloadWatcher = window.fs.watch(
      path,
      { recursive: true },
      () => {
      console.log('file changed');
      console.log(new Date());
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
          location.reload();
          reloadWatcher.close();
      }, 800);
      // location.replace(index);
  /*     for (const i in require.cache) {
        if (i) {
        delete require.cache[i];
      }
    }*/
      // const win = window.nw.Window.get();
      // chrome.runtime.getUrl('./');
      console.log(this.win);
      // window.nw.Window.open(index);
      // this.win.window.location.reload();
      // this.win.close();
      // location.assign(index);
      // location.replace(location.pathname);
      // setTimeout(() => {
      // location.reload();
      // reloadWatcher.close();
     // } , 1000)
    });
  }
}
