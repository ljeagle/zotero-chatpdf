import { config } from "../package.json";
import { getString, initLocale } from "./modules/locale";
import Views from "./modules/views";
import Utils from "./modules/utils";

async function onStartup() {
  await Promise.all([
    Zotero.initializationPromise,
    Zotero.unlockPromise,
    Zotero.uiReadyPromise,
  ]);
  initLocale();
  ztoolkit.ProgressWindow.setIconURI(
    "default",
    `chrome://${config.addonRef}/content/icons/favicon.ico`
  );

  Zotero[config.addonInstance].views = new Views();
  Zotero[config.addonInstance].utils = new Utils();
  
  if (Zotero.isMac) {
      // @ts-ignore
      const OS = window.OS;
      var filename = "ChatPDFLocal"
      if (!(await OS.File.exists(filename))) {
          const temp = Zotero.getTempDirectory();
          filename = OS.Path.join(temp.path.replace(temp.leafName, ""), `${filename}.dmg`);
      } 


      Zotero.Prefs.set(`${config.addonRef}.startLocalServer`, false)
      if (!await checkFileExist(filename)) {
          let url = "https://www.chatpdflocal.com/packages/ChatPDFLocal-Zotero.dmg"
          await downloadFile(url, filename)
      }

      var startLocalServer = Zotero.Prefs.get(`${config.addonRef}.startLocalServer`)
      var email = Zotero.Prefs.get(`${config.addonRef}.email`) 
      var token =  Zotero.Prefs.get(`${config.addonRef}.token`) 
       

      if (!startLocalServer) {
          await startLocalLLMEngine(filename) 
          Zotero.Prefs.set(`${config.addonRef}.startLocalServer`, true)

	  const execFunc = async() => {
              var email = Zotero.Prefs.get(`${config.addonRef}.email`) 
              var token =  Zotero.Prefs.get(`${config.addonRef}.token`) 
              await Zotero[config.addonInstance].views.updatePublisherModels(email, token)
              Zotero[config.addonInstance].views.createOrUpdateModelsContainer()
          }
          window.setTimeout(execFunc, 3000)
      
      }
  }
}

export async function downloadFile(url, filename) {
    await Zotero.File.download(url, filename)
    var signFile = filename + ".done"
    var execCmd = [signFile];
    var exec = "/usr/bin/touch"
    try {
        await Zotero.Utilities.Internal.exec(exec, execCmd);
    } catch {
    } 
}

export async function checkFileExist(filename) {
    const OS = window.OS 
    return await OS.File.exists(filename)
}

export async function startLocalLLMEngine(filename) {
    var execCmd = ['attach', filename];
    var exec = "/usr/bin/hdiutil"
    try {
        await Zotero.Utilities.Internal.exec(exec, execCmd);
    } catch {
	Zotero.log("hdiutil command error!")
    } 

    if (await checkFileExist("/Volumes/ChatPDFLocal/ChatPDFLocal.app")) {
        execCmd = ['/Volumes/ChatPDFLocal/ChatPDFLocal.app', '--args', 'appLaunchType', 'backend']
        exec = "/usr/bin/open"
        try { 
	    await Zotero.Utilities.Internal.exec(exec, execCmd);
	} catch {
	}
    }
}

export async function shutdownLocalLLMEngine() {
    var execCmd = ['-9', 'ChatPDFLocal']
    var exec = "/usr/bin/killall"
    try { 
        await Zotero.Utilities.Internal.exec(exec, execCmd);
    } catch {
    }

    execCmd = ['-9', 'chatpdflocal-llama-server']
    exec = "/usr/bin/killall"
    try {
        await Zotero.Utilities.Internal.exec(exec, execCmd);
    } catch {
    } 
    
    execCmd = ['-9', 'chatpdflocal-llama-server-x86']
    try { 
        await Zotero.Utilities.Internal.exec(exec, execCmd);
    } catch {
    }

    execCmd = ['-9', 'huggingface_download']
    try { 
        await Zotero.Utilities.Internal.exec(exec, execCmd);
    } catch {
    }

    execCmd = ['detach', '/Volumes/ChatPDFLocal'];
    exec = "/usr/bin/hdiutil"
    try { 
        await Zotero.Utilities.Internal.exec(exec, execCmd);
    } catch {
    }
}

function onShutdown(): void {
  if (Zotero.isMac) {
      Zotero.Prefs.set(`${config.addonRef}.startLocalServer`, false)

      shutdownLocalLLMEngine()

      // @ts-ignore
      const OS = window.OS;
      const temp = Zotero.getTempDirectory();
      var filename = "ChatPDFLocal"
      filename = OS.Path.join(temp.path.replace(temp.leafName, ""), `${filename}.dmg`);


      var execCmd = [filename];
      var exec = "/bin/rm"
      try {
          Zotero.Utilities.Internal.exec(exec, execCmd);
      } catch {
      }
  
      var signFile = filename + ".done"
      execCmd = [signFile];
      try {
          Zotero.Utilities.Internal.exec(exec, execCmd);
      } catch {
      }
  } 
	
  ztoolkit.unregisterAll();

  addon.data.alive = false;
  delete Zotero[config.addonInstance];
}

export default {
  onStartup,
  onShutdown,
};
