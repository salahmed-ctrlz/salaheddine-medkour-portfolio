declare module 'imagemin' {
  interface Options {
    destination: string;
    plugins: any[];
  }
  function imagemin(files: string[], options: Options): Promise<Array<{destinationPath: string}>>;
  export = imagemin;
}

declare module 'imagemin-webp' {
  interface Options {
    quality?: number;
    method?: number;
  }
  function imageminWebp(options?: Options): any;
  export = imageminWebp;
} 