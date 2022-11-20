import { ensureFile } from "https://deno.land/std@0.160.0/fs/ensure_file.ts";
import * as path from "https://deno.land/std@0.160.0/path/mod.ts";

interface DoubleDashInfo {
  optionName: string;
  optionValue: string | undefined;
}

console.log(Deno.args);

const commandType = Deno.args[0];

if (commandType === 'g' || commandType === 'generate') {
  const createTargetType = Deno.args[1];
  switch (createTargetType) {
    case 'component': {
      generateComponent();
    } break;
  }
}

function getDoubleDashOptions() {
  // const doubleDashInfo: DoubleDashInfo[] = [];
  const doubleDashInfo = new Map<string, string | undefined>();
  Deno.args.forEach((value, index) => {
    if (value.indexOf('--') === 0) {
      doubleDashInfo.set(value, Deno.args[index + 1]);
    }
  });
  return doubleDashInfo;
}

function getFirstCharUpperString(value: string) {
  let newString = '';
  for (let i = 0; i < value.length; i++) {
    if (i === 0) {
      newString += value[i].toUpperCase();
    } else {
      newString += value[i];
    }
  }
  return newString;
}

async function generateComponent() {
  const currentWorkingDirectory = Deno.cwd();
  const targetPath = Deno.args[2];
  const targetPathSplit = targetPath.split('/');
  const componentName = targetPathSplit[targetPathSplit.length - 1];
  console.log('componentName', componentName); // ex) sample-box
  const componentNameSplit = componentName.split('-');
  const componentCamelCase = componentNameSplit.map(x => getFirstCharUpperString(x)).join('');
  
  const fileCreateBasePath = path.join(currentWorkingDirectory, 'src', targetPath + '/');
  const componentFileName = `${componentName}.component.tsx`;
  const componentInterfaceFileName = `${componentName}.interface.ts`;
  const componentStyleFileName = `${componentName}.component.module.scss`;

  const doubleDashOptions = getDoubleDashOptions();

  // .component.tsx
  let componentString = `
import styles from "./${componentStyleFileName}";
import { I${componentCamelCase} } from "./${componentName}.interface";

const ${componentCamelCase} = (props: I${componentCamelCase}.Props) => {
  return (
    <>

    </>
  );
};

export default ${componentCamelCase};
  `.trim();
  if (doubleDashOptions.has("--f")) {
    componentString = `
import styles from "./${componentStyleFileName}";
import { I${componentCamelCase} } from "./${componentName}.interface";
import { ForwardedRef, forwardRef, useImperativeHandle } from "react";

const ${componentCamelCase} = forwardRef((props: I${componentCamelCase}.Props, ref: ForwardedRef<I${componentCamelCase}.RefObject>) => {
  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    
  }));

  return (
    <>

    </>
  );
});
${componentCamelCase}.displayName = '${componentCamelCase}';

export default ${componentCamelCase};
    `.trim();
  }
  await ensureFile(path.join(fileCreateBasePath, componentFileName));
  await Deno.writeTextFile(path.join(fileCreateBasePath, componentFileName), componentString, { append: true });

  // .interface.ts
  let interfaceString = `
import React from "react";

export declare namespace I${componentCamelCase} {
  export interface Props {
    children?: React.ReactNode;
  }
}
  `.trim();
  if (doubleDashOptions.has("--f")) {
    interfaceString = `
import React from "react";

export declare namespace I${componentCamelCase} {
  export interface RefObject {
    
  }

  export interface Props {
    children?: React.ReactNode;
  }
}
    `.trim();
  }
  await ensureFile(path.join(fileCreateBasePath, componentInterfaceFileName));
  await Deno.writeTextFile(path.join(fileCreateBasePath, componentInterfaceFileName), interfaceString, { append: true });

  // .component.module.scss
  await ensureFile(path.join(fileCreateBasePath, componentStyleFileName));
  await Deno.writeTextFile(path.join(fileCreateBasePath, componentStyleFileName), ``.trim(), { append: true });
}