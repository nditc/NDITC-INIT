import React, { useMemo } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "@/styles/markdown.css";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkMath from "remark-math";

type props = {
  children: string | null | undefined;
  className?: string;
};

const MdSection = ({ children, className }: props) => {
  const modifiedText = useMemo(() => {
    const lines = (children || "").split("\n");

    return lines
      .map((line, index) => {
        // Check if the line is part of a list
        const isListItem = /^\s*[*\-+]\s+|^\s*\d+\.\s+/.test(line);
        const isNextLineListItem =
          index < lines.length - 1 &&
          /^\s*[*\-+]\s+|^\s*\d+\.\s+/.test(lines[index + 1]);

        if (isListItem || isNextLineListItem) return line;

        if (line.trim() === "\\") return line.replace("\\", "&nbsp;\n");

        return line + "&nbsp;\n";
      })
      .join("\n")
      .replaceAll("~~", "\n --- \n");
  }, [children]);

  return (
    <Markdown
      rehypePlugins={[rehypeHighlight, rehypeSanitize, rehypeRaw]}
      remarkPlugins={[remarkGfm, remarkMath]}
      className={"markdown " + className}
    >
      {modifiedText}
    </Markdown>
  );
};

export default MdSection;
