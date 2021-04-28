/* Copyright 2020 Record Replay Inc. */

import type { Compiler } from "webpack";
import {
  uploadSourceMaps,
  UploadOptions,
  LogCallback,
  MessageLevel,
} from "@recordreplay/sourcemap-upload";
import assert from "assert";

export interface PluginOptions extends UploadOptions {
  logLevel?: "quiet" | "normal" | "verbose";
}

export default class ReplaySourceMapUploadWebpackPlugin {
  options: UploadOptions;

  constructor(opts: PluginOptions) {
    assert(opts, "ReplaySourceMapUploadWebpackPlugin requires options");
    const { logLevel = "normal", ...restOpts } = opts;

    let log: LogCallback | undefined;
    if (logLevel === "normal") {
      log = (level, message) => {
        if (level === MessageLevel.Normal) {
          console.log(message);
        }
      };
    } else if (logLevel === "verbose") {
      log = (level, message) => {
        console.log(message);
      };
    }

    this.options = {
      ...restOpts,
      log,
    };
  }

  async afterAssetEmit(): Promise<void> {
    await uploadSourceMaps(this.options);
  }

  apply(compiler: Compiler): void {
    compiler.hooks.afterEmit.tapPromise("ReplayWebpackPlugin", () =>
      this.afterAssetEmit()
    );
  }
}
