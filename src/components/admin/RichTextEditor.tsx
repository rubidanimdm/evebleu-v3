import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Bold, Italic, Underline as UnderlineIcon, Heading1, Heading2, Heading3,
  List, ListOrdered, Link as LinkIcon, ImageIcon, AlignLeft, AlignCenter,
  AlignRight, Code, Quote, Minus, Eye, Code2,
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

const editorStylesId = 'rich-text-editor-styles';

function injectStyles() {
  if (document.getElementById(editorStylesId)) return;
  const style = document.createElement('style');
  style.id = editorStylesId;
  style.textContent = `
    .ProseMirror { min-height: 400px; outline: none; padding: 1rem; color: hsl(var(--foreground)); }
    .ProseMirror h1 { font-size: 2em; font-weight: bold; margin: 0.5em 0; }
    .ProseMirror h2 { font-size: 1.5em; font-weight: bold; margin: 0.5em 0; }
    .ProseMirror h3 { font-size: 1.25em; font-weight: bold; margin: 0.5em 0; }
    .ProseMirror p { margin: 0.5em 0; }
    .ProseMirror ul, .ProseMirror ol { padding-left: 1.5em; }
    .ProseMirror ul { list-style: disc; }
    .ProseMirror ol { list-style: decimal; }
    .ProseMirror blockquote { border-left: 3px solid #E6B800; padding-left: 1em; margin: 1em 0; opacity: 0.85; }
    .ProseMirror code { background: rgba(255,255,255,0.1); padding: 0.2em 0.4em; border-radius: 3px; font-family: monospace; }
    .ProseMirror pre { background: rgba(0,0,0,0.3); padding: 1em; border-radius: 8px; overflow-x: auto; }
    .ProseMirror pre code { background: none; padding: 0; }
    .ProseMirror img { max-width: 100%; border-radius: 8px; }
    .ProseMirror hr { border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 1.5em 0; }
    .ProseMirror a { color: #E6B800; text-decoration: underline; cursor: pointer; }
    .ProseMirror .is-editor-empty:first-child::before {
      content: attr(data-placeholder);
      color: hsl(var(--muted-foreground));
      pointer-events: none;
      float: left;
      height: 0;
    }
  `;
  document.head.appendChild(style);
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const [sourceMode, setSourceMode] = useState(false);
  const [htmlSource, setHtmlSource] = useState(content);

  useEffect(() => {
    injectStyles();
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: 'noopener noreferrer' } }),
      Image.configure({ inline: false, allowBase64: true }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'Start writing your content...' }),
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  const toggleSource = useCallback(() => {
    if (sourceMode) {
      // Switching back to visual: push HTML source into editor
      editor?.commands.setContent(htmlSource);
      onChange(htmlSource);
    } else {
      // Switching to source: capture current editor HTML
      setHtmlSource(editor?.getHTML() || '');
    }
    setSourceMode(!sourceMode);
  }, [sourceMode, htmlSource, editor, onChange]);

  const addLink = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('Enter URL:');
    if (!url) return;
    if (editor.state.selection.empty) {
      editor.chain().focus().insertContent(`<a href="${url}">${url}</a>`).run();
    } else {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('Enter image URL:');
    if (!url) return;
    editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  if (!editor) return null;

  const ToolbarButton = ({
    onClick,
    active,
    children,
    title,
  }: {
    onClick: () => void;
    active?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={`h-8 w-8 ${active ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`}
      onClick={onClick}
      title={title}
    >
      {children}
    </Button>
  );

  const Separator = () => <div className="w-px h-6 bg-border/50 mx-0.5" />;

  return (
    <div className="border border-border/40 rounded-lg overflow-hidden bg-card/50">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-border/30 bg-muted/30">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold">
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic">
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline">
          <UnderlineIcon className="h-4 w-4" />
        </ToolbarButton>

        <Separator />

        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title="Heading 1">
          <Heading1 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2">
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3">
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>

        <Separator />

        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet List">
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Ordered List">
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>

        <Separator />

        <ToolbarButton onClick={addLink} active={editor.isActive('link')} title="Link">
          <LinkIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={addImage} title="Image">
          <ImageIcon className="h-4 w-4" />
        </ToolbarButton>

        <Separator />

        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Align Left">
          <AlignLeft className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Align Center">
          <AlignCenter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Align Right">
          <AlignRight className="h-4 w-4" />
        </ToolbarButton>

        <Separator />

        <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Code Block">
          <Code className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote">
          <Quote className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal Rule">
          <Minus className="h-4 w-4" />
        </ToolbarButton>

        <div className="flex-1" />

        <ToolbarButton onClick={toggleSource} active={sourceMode} title={sourceMode ? 'Visual Editor' : 'HTML Source'}>
          {sourceMode ? <Eye className="h-4 w-4" /> : <Code2 className="h-4 w-4" />}
        </ToolbarButton>
      </div>

      {/* Editor area */}
      {sourceMode ? (
        <Textarea
          value={htmlSource}
          onChange={(e) => setHtmlSource(e.target.value)}
          className="min-h-[400px] rounded-none border-0 font-mono text-sm resize-y focus-visible:ring-0"
          placeholder="<p>Write HTML here...</p>"
        />
      ) : (
        <EditorContent editor={editor} />
      )}
    </div>
  );
}
