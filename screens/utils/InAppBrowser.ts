import * as WebBrowser from 'expo-web-browser';

export const _handlePressButtonAsync = async ({link,onSuccess}:{link:string,onSuccess?:(result:any)=>void}) => {
    try{
        let result = await WebBrowser.openBrowserAsync('https://expo.dev');
        onSuccess? onSuccess(result) :null
    }catch(e){
        console.error(e);
    }
  };