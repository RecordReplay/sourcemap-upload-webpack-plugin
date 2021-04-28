# @recordreplay/sourcemap-upload-webpack-plugin

Wraps Replay's [sourcemap-upload][1] module in a Webpack plugin so that it
will execute automatically when the Webpack build has completed.

## PluginOptions

The Webpack plugin, which is the default export of this module, exposes all of
the same options as [sourcemap-upload][1], along with some additional:

```typescript
export interface PluginOptions extends UploadOptions {
  logLevel?: "quiet" | "normal" | "verbose";
}
```

[1]: https://github.com/recordreplay/sourcemap-upload
