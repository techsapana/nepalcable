"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useEffect, useRef } from "react";
import { lightDefaultTheme } from "@blocknote/mantine";
import dynamic from "next/dynamic";

interface EditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

// Lazy load editor content with ssr disabled
const EditorContent = dynamic(() => Promise.resolve(EditorContentComponent), {
  ssr: false,
});

function EditorContentComponent({
  value = "",
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) {
  const editor = useCreateBlockNote();
  const lastSyncedValue = useRef<string | null>(null);

  useEffect(() => {
    if (!editor) return;

    const nextValue = value ?? "";

    if (lastSyncedValue.current === nextValue) {
      return;
    }

    try {
      if (nextValue) {
        const blocks = JSON.parse(nextValue);
        editor.replaceBlocks(editor.document, blocks);
      } else {
        editor.replaceBlocks(editor.document, []);
      }
      lastSyncedValue.current = nextValue;
    } catch {
      console.warn("Invalid JSON in editor value");
    }
  }, [editor, value]);

  useEffect(() => {
    if (!editor) return;

    const unsubscribe = editor.onEditorContentChange(() => {
      if (onChange) {
        const content = JSON.stringify(editor.document);
        lastSyncedValue.current = content;
        onChange(content);
      }
    });

    return typeof unsubscribe === "function" ? unsubscribe : undefined;
  }, [editor, onChange]);

  // Renders the editor instance using a React component.
  return (
    <div className="w-full min-h-96 border-2 border-gray-300 rounded-lg overflow-hidden">
      <BlockNoteView editor={editor} theme={lightDefaultTheme} />
    </div>
  );
}

// Our <Editor> component
export default function Editor(props: EditorProps) {
  return (
    <>
      <EditorContent {...props} />
    </>
  );
}
