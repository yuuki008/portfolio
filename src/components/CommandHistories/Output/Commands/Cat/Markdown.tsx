import React, { useEffect, useState } from "react";
import { marked } from "marked";

type Props = {
  content: string;
};

export const Markdown = (props: Props) => {
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    const f = async () => {
      const html = await marked(props.content);
      setMarkdownContent(html);
    };
    f();
  }, [props.content]);
  return (
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: markdownContent }}
    />
  );
};
