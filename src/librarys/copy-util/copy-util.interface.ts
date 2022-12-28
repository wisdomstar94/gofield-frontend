import ClipboardJS from 'clipboard';

export declare namespace ICopyUtilLibrary {
  export interface TextCopyResult extends ClipboardJS.Event {
    result?: 'success' | 'error';
  }

  export interface CopyParams {
    text: string;
  }
}
