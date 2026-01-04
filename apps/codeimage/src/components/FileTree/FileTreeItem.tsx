import {getFileIcon, getFolderIcon} from '@codeimage/config';
import {RemoteSvgIcon} from '@codeimage/ui';
import {For, Show, VoidProps, createMemo} from 'solid-js';
import {TreeNode} from '../../utils/tree-parser/types';
import * as styles from './FileTreeItem.css';

interface FileTreeItemProps {
  node: TreeNode;
  depth: number;
}

const INDENT_SIZE = 16;

export function FileTreeItem(props: VoidProps<FileTreeItemProps>) {
  const icon = createMemo(() => {
    if (props.node.type === 'directory') {
      return getFolderIcon(props.node.name);
    }
    return getFileIcon(props.node.name);
  });

  return (
    <div class={styles.item}>
      <div
        class={styles.row}
        style={{'padding-left': `${props.depth * INDENT_SIZE}px`}}
      >
        <div class={styles.iconWrapper}>
          <RemoteSvgIcon content={icon().content} size="sm" delay={0} />
        </div>
        <span class={styles.name}>{props.node.name}</span>
      </div>

      <Show
        when={props.node.type === 'directory' && props.node.children.length > 0}
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
