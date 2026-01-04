import {getRootEditorStore} from '@codeimage/store/editor';
import {getActiveEditorStore} from '@codeimage/store/editor/activeEditor';
import {getThemeStore} from '@codeimage/store/theme/theme.store';
import {Annotation, Transaction} from '@codemirror/state';
import {EditorView} from '@codemirror/view';
import {createEffect, createMemo, createSignal, lazy, on, Show} from 'solid-js';
import {parseTreeContent} from '../../utils/tree-parser/tree-parser';
import {FileTree} from '../FileTree';

const syncAnnotation = Annotation.define<boolean>();

function syncDispatch(tr: Transaction, other: EditorView) {
  if (!tr.changes.empty && !tr.annotation(syncAnnotation)) {
    const annotations: Annotation<unknown>[] = [syncAnnotation.of(true)];
    const userEvent = tr.annotation(Transaction.userEvent);
    if (userEvent) annotations.push(Transaction.userEvent.of(userEvent));
    other.dispatch({changes: tr.changes, annotations});
  }
}

const CustomEditor = lazy(() => import('./CustomEditor'));

interface PreviewExportEditorProps {
  onSetEditorView(editorView: EditorView | undefined): void;
}

export default function PreviewExportEditor(props: PreviewExportEditorProps) {
  const [editorView, setEditorView] = createSignal<EditorView>();
  const activeEditorStore = getActiveEditorStore();
  const {themeArray: themes} = getThemeStore();
  const {state: editorState} = getRootEditorStore();

  const viewMode = () => activeEditorStore.editor()?.viewMode ?? 'editor';

  const themeConfiguration = createMemo(
    () =>
      themes().find(theme => theme()?.id === editorState.options.themeId)?.() ??
      themes()[0]()!,
  );

  const parsedTree = createMemo(() => {
    if (viewMode() !== 'filetree') return null;
    const code = activeEditorStore.editor()?.code ?? '';
    return parseTreeContent(code);
  });

  createEffect(
    on(editorView, editorView => {
      if (!editorView) return;
      getRootEditorStore().canvasEditorEvents.listen(tr => {
        setTimeout(() => syncDispatch(tr, editorView), 250);
        setInterval(() => editorView.requestMeasure());
      });
    }),
  );

  return (
    <Show
      when={viewMode() === 'filetree' && parsedTree()}
      fallback={
        <CustomEditor
          onEditorViewChange={editorView => {
            props.onSetEditorView(editorView);
            setEditorView(editorView);
          }}
          readOnly={true}
        />
      }
    >
      <FileTree
        nodes={parsedTree()!.nodes}
        textColor={themeConfiguration()?.properties.terminal.text}
      />
    </Show>
  );
}
