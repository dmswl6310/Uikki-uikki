import { createElement, useMemo } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { RegisteredComponentInfo } from "@/types/component.types";
import CodeTabs from "./common/CodeTabs";

const formatHTML = (html: string) => {
  let formatted = "";
  let indent = "";

  html.split(/>\s*</).forEach((element) => {
    if (element.match(/^\/\w/)) indent = indent.substring(2);
    formatted += `${indent}<${element}>\n`;

    if (
      element.match(/^<?\w[^>]*[^/]$/) &&
      !["input", "img", "br", "hr", "path", "circle", "line", "polyline"].some(
        (tag) => element.startsWith(tag),
      )
    ) {
      indent += "  ";
    }
  });

  return formatted.substring(1, formatted.length - 2).trim();
};

const SourceCodePanel = ({ detail }: { detail: RegisteredComponentInfo }) => {
  const htmlCode = useMemo(
    () =>
      detail.Component && detail.examples.length > 0
        ? formatHTML(
            renderToStaticMarkup(
              createElement(detail.Component, detail.examples[0]),
            ),
          )
        : "",
    [detail],
  );

  return (
    <CodeTabs
      code={detail.code}
      codeJs={detail.codeJs}
      htmlCode={htmlCode}
    />
  );
};

export default SourceCodePanel;
