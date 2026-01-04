import {getRootEditorStore} from '@codeimage/store/editor';
import {getActiveEditorStore} from '@codeimage/store/editor/activeEditor';
import {dispatchRandomTheme} from '@codeimage/store/effects/onThemeChange';
import {HStack, SegmentedField, SegmentedFieldItem} from '@codeimage/ui';
import {Button} from '@codeui/kit';
import {createAsyncAction} from '@core/hooks/async-action';
import {createMemo, Show} from 'solid-js';
import {ViewMode} from '../../state/editor/model';
import {ColorSwatchIcon} from '../Icons/ColorSwatch';
import {SparklesIcon} from '../Icons/SparklesIcon';
import {CopyToClipboardButton} from './CopyToClipboardButton';
import {ExportInNewTabButton} from './ExportNewTabButton';
import {ExportSettingsButton} from './ExportSettingsButton';
import * as styles from './FrameToolbar.css';

const VIEW_MODE_ITEMS: readonly SegmentedFieldItem<ViewMode>[] = [
  {label: 'Code', value: 'editor'},
  {label: 'Tree', value: 'filetree'},
] as const;

interface FrameToolbarProps {
  frameRef: HTMLElement | undefined;
}

export function FrameToolbar(props: FrameToolbarProps) {
  const activeEditorStore = getActiveEditorStore();
  const {actions} = getRootEditorStore();
  const [formatAction, {notify: dispatchFormat}] = createAsyncAction(() =>
    activeEditorStore.format(),
  );

  const isTreeFile = createMemo(() => {
    const tabName = activeEditorStore.editor()?.tab.tabName;
    return tabName?.endsWith('.tree') ?? false;
  });

  const currentViewMode = () =>
    activeEditorStore.editor()?.viewMode ?? 'editor';

  const handleViewModeChange = (viewMode: ViewMode) => {
    const editorId = activeEditorStore.editor()?.id;
    if (editorId) {
      actions.setViewMode({editorId, viewMode});
    }
  };

  return (
    <div class={styles.frameToolbar}>
      <HStack spacing={2}>
        <Show when={isTreeFile()}>
          <SegmentedField
            items={VIEW_MODE_ITEMS}
            value={currentViewMode()}
            onChange={handleViewModeChange}
            size="xs"
          />
        </Show>
        <ExportSettingsButton />
        <CopyToClipboardButton canvasRef={props.frameRef} />
        <Button
          size={'xs'}
          theme={'secondary'}
          leftIcon={<ColorSwatchIcon />}
          onClick={() => dispatchRandomTheme()}
        >
          Randomize
        </Button>
        <Button
          size={'xs'}
          theme={'secondary'}
          loading={formatAction.loading}
          leftIcon={<SparklesIcon />}
          disabled={!activeEditorStore.canFormat()}
          onClick={() => dispatchFormat()}
        >
          Format
        </Button>
        <ExportInNewTabButton canvasRef={props.frameRef} size={'xs'} />
      </HStack>
    </div>
  );
}
