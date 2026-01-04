import {assignInlineVars} from '@vanilla-extract/dynamic';
import {For, VoidProps} from 'solid-js';
import {TreeNode} from '../../utils/tree-parser/types';
import * as styles from './FileTree.css';
import {FileTreeItem} from './FileTreeItem';

interface FileTreeProps {
  nodes: TreeNode[];
  textColor?: string;
  backgroundColor?: string;
}

export function FileTree(props: VoidProps<FileTreeProps>) {
  return (
    <div
      class={styles.container}
      style={assignInlineVars({
        [styles.textColorVar]: props.textColor ?? '#ffffff',
        [styles.backgroundColorVar]: props.backgroundColor ?? 'transparent',
      })}
    >
      <For each={props.nodes}>
        {node => <FileTreeItem node={node} depth={0} />}
      </For>
    </div>
  );
}
