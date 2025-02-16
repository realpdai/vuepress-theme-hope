/* eslint-disable @typescript-eslint/naming-convention */
import { createBaseApp } from "@vuepress/core";
import { path } from "@vuepress/utils";
import { describe, it, expect } from "vitest";

import { getStatus } from "../../src/node/status.js";
import { getThemeConfig } from "../../src/node/themeConfig.js";
import { emptyTheme } from "./__fixtures__/theme/empty.js";

import type { ThemeOptions } from "../../src/shared/index.js";

const app = createBaseApp({
  bundler: {} as any,
  source: path.resolve(__dirname, "./__fixtures__/src"),
  theme: emptyTheme,
});

describe("should generate themeConfig correctly", () => {
  it("Should contain basic properties", () => {
    const themeConfig = {};

    expect(
      getThemeConfig(app, themeConfig, getStatus(app, {}))
    ).toMatchSnapshot();
  });

  it("Should handle single language", () => {
    const themeConfig = {
      navbar: ["/", "/about"],
      sidebar: ["/", "/about"],
    };

    expect(
      getThemeConfig(app, themeConfig, getStatus(app, {}))
    ).toMatchSnapshot();
  });

  it("locale should have higher property", () => {
    const themeConfig = {
      navbar: ["/", "/about"],

      locales: {
        "/": {
          navbar: ["/", "/guide", "/about"],
        },
        "/zh/": {
          navbar: ["/zh/", "/zh/about"],
        },
      },
    };

    expect(
      getThemeConfig(app, themeConfig, getStatus(app, {}))
    ).toMatchSnapshot();
  });

  it("should fallback to root if locale config is missing", () => {
    const themeConfig = {
      navbar: ["/", "/about"],

      locales: {
        "/": {},
        "/zh/": {
          navbar: ["/zh/", "/zh/about"],
        },
      },
    };

    expect(
      getThemeConfig(app, themeConfig, getStatus(app, {}))
    ).toMatchSnapshot();
  });

  it("root only option should not appear in locales", () => {
    const themeConfig: ThemeOptions = {
      pure: true,
      darkmode: "disable",
      encrypt: {},
    };

    expect(
      getThemeConfig(app, themeConfig, getStatus(app, {}))
    ).toMatchSnapshot();
  });
});
