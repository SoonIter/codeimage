import {getFileIcon, getFolderIcon} from '@codeimage/config';
import {RemoteSvgIcon} from '@codeimage/ui';
import {For, Show, VoidProps, createMemo, createSignal} from 'solid-js';
import {TreeNode} from '../../utils/tree-parser/types';
import * as styles from './FileTreeItem.css';

interface FileTreeItemProps {
  node: TreeNode;
  depth: number;
}

const INDENT_SIZE = 12;

export function FileTreeItem(props: VoidProps<FileTreeItemProps>) {
  const [expanded, setExpanded] = createSignal(true);

  const icon = createMemo(() => {
    if (props.node.type === 'directory') {
      return getFolderIcon(props.node.name);
    }
    return getFileIcon(props.node.name);
  });

  const isDirectory = () => props.node.type === 'directory';

  const toggle = (e: MouseEvent) => {
    e.stopPropagation();
    if (isDirectory()) {
      setExpanded(p => !p);
    }
  };

  return (
    <div class={styles.item}>
      <div
        class={styles.row}
        onClick={toggle}
        style={{'padding-left': `${props.depth * INDENT_SIZE}px`}}
      >
        <div
          class={styles.chevron({expanded: expanded()})}
          style={{visibility: isDirectory() ? 'visible' : 'hidden'}}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.072 8.024L5.715 3.667l.618-.62L11 8.024l-4.667 4.977-.618-.62L10.072 8.024z"
            />
          </svg>
        </div>
        <div class={styles.iconWrapper}>
          <RemoteSvgIcon content={icon().content} size="sm" delay={0} />
        </div>
        <span class={styles.name}>{props.node.name}</span>
      </div>

      <Show
        when={isDirectory() && props.node.children.length > 0 && expanded()}
      >
        <div class={styles.children}>
          <For each={props.node.children}>
            {child => <FileTreeItem node={child} depth={props.depth + 1} />}
          </For>
        </div>
      </Show>
    </div>
  );
}
