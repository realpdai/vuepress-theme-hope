import { mergeViteConfig } from "./mergeViteConfig.js";
import { detectPackageManager } from "../../utils/index.js";

import type { App } from "@vuepress/core";
import type { ViteBundlerOptions } from "@vuepress/bundler-vite";

export interface ViteCommonOptions {
  app: App;
  config: unknown;
}

/**
 * Add modules to Vite `optimizeDeps.include` list
 */
export const addViteOptimizeDepsInclude = (
  { app, config }: ViteCommonOptions,
  module: string | string[]
): void => {
  const { bundler } = app.options;
  const manager = detectPackageManager();

  if (
    bundler.name.endsWith("vite") &&
    ("OPTIMIZE_DEPS" in process.env
      ? Boolean(process.env["OPTIMIZE_DEPS"])
      : manager !== "pnpm")
  ) {
    const bundlerConfig = <ViteBundlerOptions>config;

    bundlerConfig.viteOptions = mergeViteConfig(
      bundlerConfig.viteOptions || {},
      {
        optimizeDeps: {
          include: typeof module === "string" ? [module] : module,
        },
      }
    );

    bundlerConfig.viteOptions.optimizeDeps!.include = Array.from(
      new Set(bundlerConfig.viteOptions.optimizeDeps!.include)
    );
  }
};

/**
 * Add modules to Vite `optimizeDeps.exclude` list
 */
export const addViteOptimizeDepsExclude = (
  { app, config }: ViteCommonOptions,
  module: string | string[]
): void => {
  const { bundler } = app.options;

  if (bundler.name.endsWith("vite")) {
    const bundlerConfig = <ViteBundlerOptions>config;

    bundlerConfig.viteOptions = mergeViteConfig(
      bundlerConfig.viteOptions || {},
      {
        optimizeDeps: {
          exclude: typeof module === "string" ? [module] : module,
        },
      }
    );

    bundlerConfig.viteOptions.optimizeDeps!.exclude = Array.from(
      new Set(bundlerConfig.viteOptions.optimizeDeps!.exclude)
    );
  }
};

/**
 * Add modules to Vite `ssr.external` list
 */
export const addViteSsrExternal = (
  { app, config }: ViteCommonOptions,
  module: string | string[]
): void => {
  const { bundler } = app.options;

  if (bundler.name.endsWith("vite")) {
    const bundlerConfig = <ViteBundlerOptions>config;

    bundlerConfig.viteOptions = mergeViteConfig(
      bundlerConfig.viteOptions || {},
      {
        ssr: {
          external: typeof module === "string" ? [module] : module,
        },
      }
    );
  }
};

/**
 * Add modules to Vite `ssr.noExternal` list
 */
export const addViteSsrNoExternal = (
  { app, config }: ViteCommonOptions,
  module: string | string[]
): void => {
  const { bundler } = app.options;

  if (bundler.name.endsWith("vite")) {
    const bundlerConfig = <ViteBundlerOptions>config;

    bundlerConfig.viteOptions = mergeViteConfig(
      bundlerConfig.viteOptions || {},
      {
        ssr: {
          noExternal: typeof module === "string" ? [module] : module,
        },
      }
    );
  }
};
