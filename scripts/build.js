// Generates every theme in themes/ from one palette per variant.
// Edit colors here, then run `npm run build`. `--check` fails if the
// committed theme files are out of date.
const fs = require('fs');
const path = require('path');

const TRANSPARENT = '#00000000';
const a = (color, alpha) => `${color.slice(0, 7)}${alpha}`;

const darkAccents = {
  fg: '#aeb9d2',
  fgStrong: '#dae2fd',
  fgMax: '#e7ebfb',
  muted: '#7b86a0',
  subtle: '#8b96ad',
  comment: '#7b86a0b0',
  type: '#aeb9d2c0',
  violet: '#c6a5e3',
  lavender: '#aeb0e8',
  indigo: '#98a4d6',
  sel: '#9396d7',
  teal: '#72c7bc',
  mint: '#85c9bd',
  coral: '#d98986',
  yellow: '#d4c38f',
  orange: '#d9a58a',
  bright: {
    red: '#e5a3a0',
    green: '#a3d9cf',
    yellow: '#e3d6ad',
    blue: '#c3c6f0',
    magenta: '#d7bff0',
    cyan: '#93d8cf'
  },
  onAccent: '#060e20',
  ink: '#e7ebfb'
};

const variants = [
  {
    file: 'lumina-code-color-theme.json',
    name: 'Lumina Code (Standard)',
    type: 'dark',
    p: { ...darkAccents, bg: '#0b1326', surface: '#171f33', surface2: '#222a3d', shadow: '#060e20' }
  },
  {
    file: 'lumina-code-deep-color-theme.json',
    name: 'Lumina Code (Deep)',
    type: 'dark',
    p: { ...darkAccents, bg: '#060e20', surface: '#131b2e', surface2: '#1b2338', shadow: '#02060f' }
  },
  {
    file: 'lumina-code-lighter-color-theme.json',
    name: 'Lumina Code (Dim)',
    type: 'dark',
    // The raised surface needs slightly lighter muted tones to keep comments and markers readable.
    p: { ...darkAccents, muted: '#808ba5', comment: '#808ba5b8', bg: '#171f33', surface: '#222a3d', surface2: '#2d3449', shadow: '#0b1326' }
  },
  {
    file: 'lumina-code-light-color-theme.json',
    name: 'Lumina Code Light',
    type: 'light',
    p: {
      bg: '#f6f4f9',
      surface: '#e7e1ed',
      surface2: '#ddd8e9',
      shadow: '#303244',
      fg: '#45506a',
      fgStrong: '#303244',
      fgMax: '#303244',
      muted: '#657087',
      subtle: '#5d6880',
      comment: '#6c778e',
      type: '#5d6880',
      violet: '#78519c',
      lavender: '#3d63a6',
      indigo: '#4e527d',
      sel: '#5f62a8',
      teal: '#1d6a86',
      mint: '#26766d',
      coral: '#a5525a',
      yellow: '#7a6136',
      orange: '#9a5f3e',
      bright: {
        red: '#b85c64',
        green: '#2e8579',
        yellow: '#8c6f45',
        blue: '#4a70b5',
        magenta: '#8a5fae',
        cyan: '#27789a'
      },
      onAccent: '#fffaff',
      ink: '#303244'
    }
  }
];

function colors(p, type) {
  const light = type === 'light';
  // Overlay strengths differ because the same alpha reads much weaker on a light surface.
  const border = a(p.ink, light ? '1a' : '10');
  const hairline = a(p.ink, light ? '14' : '0d');
  const fieldBackground = a(p.ink, '08');
  const fieldBorder = a(p.ink, light ? '24' : '14');

  return {
    // Base
    foreground: p.fg,
    descriptionForeground: a(p.fg, 'b3'),
    errorForeground: p.coral,
    focusBorder: p.violet,
    'icon.foreground': p.fg,
    'selection.background': a(p.sel, light ? '40' : '50'),
    'widget.shadow': a(p.shadow, light ? '1f' : '99'),
    'sash.hoverBorder': p.violet,
    'textLink.foreground': p.teal,
    'textLink.activeForeground': p.teal,
    'textBlockQuote.background': a(p.subtle, '1a'),
    'textBlockQuote.border': a(p.lavender, '80'),
    'textCodeBlock.background': a(p.surface, '80'),
    'textPreformat.foreground': p.fgStrong,
    'textSeparator.foreground': a(p.ink, '2e'),

    // Title bar, activity bar, side bar
    'titleBar.activeBackground': p.bg,
    'titleBar.activeForeground': p.fg,
    'titleBar.inactiveBackground': p.bg,
    'titleBar.inactiveForeground': p.muted,
    'activityBar.background': p.bg,
    'activityBar.foreground': p.fg,
    'activityBar.inactiveForeground': a(p.fg, '66'),
    'activityBar.activeBorder': p.fg,
    'activityBar.dropBorder': p.fg,
    'activityBarBadge.background': p.surface2,
    'activityBarBadge.foreground': p.fgStrong,
    'badge.background': p.surface2,
    'badge.foreground': p.fgStrong,
    'sideBar.background': p.bg,
    'sideBar.foreground': p.muted,
    'sideBar.dropBackground': a(p.lavender, '26'),
    'sideBarTitle.foreground': p.fg,
    'sideBarSectionHeader.background': p.bg,
    'sideBarSectionHeader.foreground': p.fg,

    // Lists and trees: hover < inactive selection < active selection
    'list.hoverBackground': a(p.surface, '80'),
    'list.hoverForeground': p.fgStrong,
    'list.inactiveSelectionBackground': p.surface,
    'list.inactiveSelectionForeground': p.fgStrong,
    'list.activeSelectionBackground': p.surface2,
    'list.activeSelectionForeground': p.fgStrong,
    'list.focusBackground': p.surface2,
    'list.focusForeground': p.fgStrong,
    'list.focusOutline': p.violet,
    'list.inactiveFocusOutline': TRANSPARENT,
    'list.highlightForeground': p.mint,
    'list.deemphasizedForeground': p.muted,
    'list.dropBackground': a(p.teal, '33'),
    'list.filterMatchBackground': a(p.lavender, '40'),
    'list.errorForeground': p.coral,
    'list.warningForeground': p.yellow,
    'list.invalidItemForeground': p.yellow,
    'listFilterWidget.background': p.surface,
    'listFilterWidget.outline': TRANSPARENT,
    'listFilterWidget.noMatchesOutline': p.coral,
    'tree.indentGuidesStroke': p.surface2,
    'tree.tableColumnsBorder': a(p.fg, '20'),

    // Editor
    'editor.background': p.bg,
    'editor.foreground': p.fg,
    'editorPane.background': p.bg,
    'editorCursor.foreground': p.fg,
    'editor.lineHighlightBackground': a(p.sel, light ? '14' : '1a'),
    'editor.lineHighlightBorder': TRANSPARENT,
    'editor.selectionBackground': a(p.sel, light ? '40' : '50'),
    'editor.inactiveSelectionBackground': a(p.sel, light ? '1f' : '26'),
    'editor.selectionHighlightBackground': a(p.sel, light ? '1f' : '33'),
    'editor.selectionHighlightBorder': TRANSPARENT,
    'editor.wordHighlightBackground': a(p.violet, light ? '1a' : '26'),
    'editor.wordHighlightStrongBackground': a(p.violet, light ? '2e' : '40'),
    'editor.findMatchBackground': a(p.teal, light ? '40' : '60'),
    'editor.findMatchBorder': p.teal,
    'editor.findMatchHighlightBackground': a(p.teal, light ? '26' : '33'),
    'editor.findRangeHighlightBackground': a(p.teal, '1a'),
    'editor.symbolHighlightBackground': a(p.lavender, '33'),
    'editor.hoverHighlightBackground': a(p.surface2, '66'),
    'editor.rangeHighlightBackground': a(p.ink, '0b'),
    'editor.foldBackground': a(p.sel, '0b'),
    'editor.linkedEditingBackground': a(p.lavender, '26'),
    'editor.snippetTabstopHighlightBackground': a(p.lavender, '26'),
    'editor.snippetFinalTabstopHighlightBorder': a(p.lavender, '80'),
    'editor.stackFrameHighlightBackground': a(p.yellow, '26'),
    'editor.focusedStackFrameHighlightBackground': a(p.mint, '26'),
    'editorLink.activeForeground': p.teal,
    'editorLineNumber.foreground': a(p.muted, light ? '99' : '80'),
    'editorLineNumber.activeForeground': p.fg,
    'editorIndentGuide.background1': p.surface,
    'editorIndentGuide.activeBackground1': a(p.muted, '66'),
    'editorWhitespace.foreground': p.surface2,
    'editorRuler.foreground': hairline,
    'editorCodeLens.foreground': p.muted,
    'editorInlayHint.background': a(p.surface, '80'),
    'editorInlayHint.foreground': p.muted,
    'editorGhostText.foreground': a(p.muted, 'b3'),
    'editorUnnecessaryCode.opacity': '#000000aa',
    'editorBracketMatch.background': a(p.sel, '33'),
    'editorBracketMatch.border': a(p.fgStrong, '40'),
    'editorBracketHighlight.foreground1': p.indigo,
    'editorBracketHighlight.foreground2': p.violet,
    'editorBracketHighlight.foreground3': p.teal,
    'editorBracketHighlight.foreground4': p.indigo,
    'editorBracketHighlight.foreground5': p.violet,
    'editorBracketHighlight.foreground6': p.teal,
    'editorBracketHighlight.unexpectedBracket.foreground': p.coral,
    'editorError.foreground': p.coral,
    'editorWarning.foreground': p.yellow,
    'editorInfo.foreground': p.teal,
    'editorHint.foreground': a(p.subtle, 'b3'),
    'editorLightBulb.foreground': p.yellow,
    'editorLightBulbAutoFix.foreground': p.teal,

    // Gutter, overview ruler, minimap
    'editorGutter.background': p.bg,
    'editorGutter.addedBackground': a(p.mint, 'b3'),
    'editorGutter.modifiedBackground': a(p.lavender, 'b3'),
    'editorGutter.deletedBackground': a(p.coral, 'b3'),
    'editorGutter.commentRangeForeground': p.fg,
    'editorGutter.foldingControlForeground': p.fg,
    'editorOverviewRuler.border': TRANSPARENT,
    'editorOverviewRuler.addedForeground': a(p.mint, '99'),
    'editorOverviewRuler.modifiedForeground': a(p.lavender, '99'),
    'editorOverviewRuler.deletedForeground': a(p.coral, '99'),
    'editorOverviewRuler.errorForeground': a(p.coral, 'b3'),
    'editorOverviewRuler.warningForeground': p.yellow,
    'editorOverviewRuler.infoForeground': p.teal,
    'editorOverviewRuler.findMatchForeground': a(p.teal, '80'),
    'editorOverviewRuler.bracketMatchForeground': p.subtle,
    'editorOverviewRuler.rangeHighlightForeground': a(p.lavender, '99'),
    'editorOverviewRuler.selectionHighlightForeground': a(p.subtle, 'cc'),
    'editorOverviewRuler.wordHighlightForeground': a(p.subtle, 'cc'),
    'editorOverviewRuler.wordHighlightStrongForeground': a(p.lavender, 'cc'),
    'editorOverviewRuler.commonContentForeground': a(p.fg, '66'),
    'editorOverviewRuler.currentContentForeground': a(p.mint, '80'),
    'editorOverviewRuler.incomingContentForeground': a(p.lavender, '80'),
    'minimap.errorHighlight': p.coral,
    'minimap.warningHighlight': p.yellow,
    'minimap.findMatchHighlight': p.teal,
    'minimap.selectionHighlight': a(p.fgStrong, '40'),
    'minimapGutter.addedBackground': a(p.mint, '80'),
    'minimapGutter.modifiedBackground': a(p.lavender, '80'),
    'minimapGutter.deletedBackground': a(p.coral, '80'),
    'minimapSlider.background': a(p.fg, '1a'),
    'minimapSlider.hoverBackground': a(p.fg, '26'),
    'minimapSlider.activeBackground': a(p.fg, '33'),
    'scrollbar.shadow': TRANSPARENT,
    'scrollbarSlider.background': a(p.fg, light ? '26' : '1a'),
    'scrollbarSlider.hoverBackground': a(p.fg, light ? '40' : '2e'),
    'scrollbarSlider.activeBackground': a(p.fg, light ? '52' : '40'),

    // Diff and merge
    'diffEditor.insertedTextBackground': a(p.mint, '26'),
    'diffEditor.removedTextBackground': a(p.coral, '26'),
    'diffEditor.insertedLineBackground': a(p.mint, '12'),
    'diffEditor.removedLineBackground': a(p.coral, '12'),
    'diffEditor.diagonalFill': a(p.fg, '33'),
    'merge.currentHeaderBackground': a(p.mint, '80'),
    'merge.currentContentBackground': a(p.mint, '33'),
    'merge.incomingHeaderBackground': a(p.lavender, '80'),
    'merge.incomingContentBackground': a(p.lavender, '33'),
    'merge.commonHeaderBackground': a(p.fg, '66'),
    'merge.commonContentBackground': a(p.fg, '29'),

    // Editor groups and tabs
    'editorGroup.border': hairline,
    'editorGroup.dropBackground': a(p.lavender, '26'),
    'editorGroupHeader.tabsBackground': p.bg,
    'editorGroupHeader.noTabsBackground': p.bg,
    'tab.border': TRANSPARENT,
    'tab.lastPinnedBorder': TRANSPARENT,
    'tab.activeBackground': a(p.surface, '80'),
    'tab.activeForeground': p.fgStrong,
    'tab.inactiveBackground': p.bg,
    'tab.inactiveForeground': p.muted,
    'tab.unfocusedActiveBackground': p.bg,
    'tab.unfocusedActiveForeground': p.fg,
    'tab.unfocusedInactiveBackground': p.bg,
    'tab.unfocusedInactiveForeground': a(p.fg, '80'),
    'tab.activeModifiedBorder': p.lavender,
    'tab.inactiveModifiedBorder': a(p.lavender, '80'),
    'tab.unfocusedActiveModifiedBorder': a(p.lavender, '40'),
    'tab.unfocusedInactiveModifiedBorder': a(p.lavender, '40'),
    'breadcrumb.background': TRANSPARENT,
    'breadcrumb.foreground': a(p.muted, 'cc'),
    'breadcrumb.focusForeground': p.fgStrong,
    'breadcrumb.activeSelectionForeground': p.fgStrong,
    'breadcrumbPicker.background': p.bg,

    // Widgets
    'editorWidget.background': p.bg,
    'editorWidget.foreground': p.fg,
    'editorWidget.border': border,
    'editorHoverWidget.background': p.bg,
    'editorHoverWidget.foreground': p.fg,
    'editorHoverWidget.border': border,
    'editorHoverWidget.statusBarBackground': p.surface,
    'editorSuggestWidget.background': p.bg,
    'editorSuggestWidget.foreground': p.fg,
    'editorSuggestWidget.border': border,
    'editorSuggestWidget.highlightForeground': p.violet,
    'editorSuggestWidget.selectedBackground': p.surface2,
    'editorSuggestWidget.selectedForeground': p.fgStrong,
    'editorMarkerNavigation.background': p.surface2,
    'editorMarkerNavigationError.background': p.coral,
    'editorMarkerNavigationWarning.background': p.yellow,
    'editorMarkerNavigationInfo.background': p.teal,
    'debugExceptionWidget.background': a(p.coral, '1a'),
    'debugExceptionWidget.border': p.coral,
    'peekView.border': hairline,
    'peekViewTitle.background': a(p.fg, '05'),
    'peekViewTitleLabel.foreground': p.fgMax,
    'peekViewTitleDescription.foreground': a(p.fg, '99'),
    'peekViewEditor.background': a(p.fg, '05'),
    'peekViewEditorGutter.background': a(p.fg, '05'),
    'peekViewEditor.matchHighlightBackground': a(p.teal, '33'),
    'peekViewResult.background': a(p.fg, '05'),
    'peekViewResult.fileForeground': p.fgMax,
    'peekViewResult.lineForeground': p.fg,
    'peekViewResult.matchHighlightBackground': a(p.teal, '33'),
    'peekViewResult.selectionBackground': a(p.sel, '26'),
    'peekViewResult.selectionForeground': p.fgMax,
    'quickInput.background': p.bg,
    'quickInput.foreground': p.fg,
    'quickInputTitle.background': a(p.ink, '1b'),
    'quickInputList.focusBackground': p.surface2,
    'quickInputList.focusForeground': p.fgStrong,
    'pickerGroup.border': border,
    'pickerGroup.foreground': p.lavender,
    'notifications.background': p.bg,
    'notifications.foreground': p.fgStrong,
    'notifications.border': p.surface,
    'notificationCenterHeader.background': p.surface,
    'notificationLink.foreground': p.teal,
    'notificationsErrorIcon.foreground': p.coral,
    'notificationsWarningIcon.foreground': p.yellow,
    'notificationsInfoIcon.foreground': p.teal,
    'menu.background': p.bg,
    'menu.foreground': p.fgStrong,
    'menu.selectionBackground': p.surface2,
    'menu.selectionForeground': p.fgStrong,
    'menu.separatorBackground': border,
    'menubar.selectionBackground': a(p.sel, '26'),
    'menubar.selectionForeground': p.fg,

    // Inputs and controls
    'input.background': fieldBackground,
    'input.border': fieldBorder,
    'input.foreground': p.fgStrong,
    'input.placeholderForeground': a(p.fg, '80'),
    'inputOption.activeBackground': a(p.violet, '26'),
    'inputOption.activeBorder': a(p.violet, '99'),
    'inputOption.activeForeground': p.fgMax,
    'inputValidation.errorBackground': p.bg,
    'inputValidation.errorBorder': p.coral,
    'inputValidation.errorForeground': p.coral,
    'inputValidation.infoBackground': p.bg,
    'inputValidation.infoBorder': p.teal,
    'inputValidation.warningBackground': p.bg,
    'inputValidation.warningBorder': p.yellow,
    'dropdown.background': p.bg,
    'dropdown.foreground': p.fgStrong,
    'dropdown.border': fieldBorder,
    'checkbox.background': p.bg,
    'checkbox.foreground': p.fgStrong,
    'checkbox.border': fieldBorder,
    'button.background': p.teal,
    'button.foreground': p.onAccent,
    'button.hoverBackground': p.mint,
    'button.secondaryBackground': p.surface2,
    'button.secondaryForeground': p.fgStrong,
    'button.secondaryHoverBackground': a(p.surface2, 'cc'),
    'extensionButton.prominentBackground': p.teal,
    'extensionButton.prominentForeground': p.onAccent,
    'extensionButton.prominentHoverBackground': p.mint,
    'extensionBadge.remoteBackground': p.surface2,
    'extensionBadge.remoteForeground': p.fgStrong,
    'extensionIcon.starForeground': p.yellow,
    'progressBar.background': p.lavender,
    'searchEditor.findMatchBackground': a(p.teal, '40'),
    'searchEditor.textInputBorder': fieldBorder,
    'settings.headerForeground': p.fgStrong,
    'settings.modifiedItemIndicator': p.lavender,
    'settings.focusedRowBackground': a(p.fg, '0d'),
    'settings.dropdownBackground': p.bg,
    'settings.dropdownForeground': p.fgStrong,
    'settings.dropdownBorder': fieldBorder,
    'settings.dropdownListBorder': border,
    'settings.checkboxBackground': p.bg,
    'settings.checkboxForeground': p.fgStrong,
    'settings.checkboxBorder': fieldBorder,
    'settings.textInputBackground': fieldBackground,
    'settings.textInputForeground': p.fgStrong,
    'settings.textInputBorder': fieldBorder,
    'settings.numberInputBackground': fieldBackground,
    'settings.numberInputForeground': p.fgStrong,
    'settings.numberInputBorder': fieldBorder,

    // Panel, status bar
    'panel.background': p.bg,
    'panel.border': hairline,
    'panel.dropBorder': p.fg,
    'panelTitle.activeForeground': p.fg,
    'panelTitle.activeBorder': p.fg,
    'panelTitle.inactiveForeground': a(p.fg, '99'),
    'panelSection.border': hairline,
    'panelSection.dropBackground': a(p.lavender, '26'),
    'panelSectionHeader.background': p.surface,
    'statusBar.background': p.bg,
    'statusBar.foreground': p.fg,
    'statusBar.noFolderBackground': p.bg,
    'statusBar.noFolderForeground': p.fg,
    'statusBar.debuggingBackground': p.surface2,
    'statusBar.debuggingForeground': p.fgMax,
    'statusBarItem.hoverBackground': a(p.ink, '1f'),
    'statusBarItem.activeBackground': a(p.ink, '2e'),
    'statusBarItem.errorBackground': p.coral,
    'statusBarItem.errorForeground': p.onAccent,
    'statusBarItem.prominentBackground': p.surface2,
    'statusBarItem.prominentForeground': p.fg,
    'statusBarItem.prominentHoverBackground': a(p.surface2, 'cc'),
    'statusBarItem.remoteBackground': p.surface,
    'statusBarItem.remoteForeground': p.fgStrong,
    'scm.providerBorder': border,

    // Terminal
    'terminal.foreground': p.fg,
    'terminal.border': TRANSPARENT,
    'terminal.selectionBackground': a(p.sel, light ? '40' : '50'),
    'terminal.ansiBlack': light ? p.fgStrong : p.surface,
    'terminal.ansiRed': p.coral,
    'terminal.ansiGreen': p.mint,
    'terminal.ansiYellow': p.yellow,
    'terminal.ansiBlue': p.lavender,
    'terminal.ansiMagenta': p.violet,
    'terminal.ansiCyan': p.teal,
    'terminal.ansiWhite': p.fg,
    'terminal.ansiBrightBlack': p.muted,
    'terminal.ansiBrightRed': p.bright.red,
    'terminal.ansiBrightGreen': p.bright.green,
    'terminal.ansiBrightYellow': p.bright.yellow,
    'terminal.ansiBrightBlue': p.bright.blue,
    'terminal.ansiBrightMagenta': p.bright.magenta,
    'terminal.ansiBrightCyan': p.bright.cyan,
    'terminal.ansiBrightWhite': p.fgMax,
    'terminalCommandDecoration.defaultBackground': p.muted,
    'terminalCommandDecoration.successBackground': p.mint,
    'terminalCommandDecoration.errorBackground': p.coral,

    // Source control
    'gitDecoration.addedResourceForeground': p.mint,
    'gitDecoration.untrackedResourceForeground': p.mint,
    'gitDecoration.modifiedResourceForeground': p.lavender,
    'gitDecoration.stageModifiedResourceForeground': p.lavender,
    'gitDecoration.deletedResourceForeground': p.coral,
    'gitDecoration.stageDeletedResourceForeground': p.coral,
    'gitDecoration.renamedResourceForeground': p.teal,
    'gitDecoration.conflictingResourceForeground': p.yellow,
    'gitDecoration.submoduleResourceForeground': p.indigo,
    'gitDecoration.ignoredResourceForeground': a(p.muted, light ? 'a6' : '80'),

    // Debugging and testing
    'debugToolBar.background': p.surface,
    'debugConsole.infoForeground': p.teal,
    'debugConsole.warningForeground': p.yellow,
    'debugConsole.errorForeground': p.coral,
    'debugConsole.sourceForeground': p.fg,
    'debugConsoleInputIcon.foreground': p.fg,
    'debugIcon.breakpointForeground': p.coral,
    'debugIcon.breakpointDisabledForeground': p.subtle,
    'debugIcon.breakpointUnverifiedForeground': p.subtle,
    'debugIcon.breakpointCurrentStackframeForeground': p.yellow,
    'debugIcon.breakpointStackframeForeground': p.mint,
    'debugIcon.startForeground': p.mint,
    'debugIcon.continueForeground': p.teal,
    'debugIcon.pauseForeground': p.teal,
    'debugIcon.restartForeground': p.mint,
    'debugIcon.stepOverForeground': p.teal,
    'debugIcon.stepIntoForeground': p.teal,
    'debugIcon.stepOutForeground': p.teal,
    'debugIcon.stepBackForeground': p.teal,
    'debugIcon.stopForeground': p.coral,
    'debugIcon.disconnectForeground': p.coral,
    'debugTokenExpression.name': p.fgStrong,
    'debugTokenExpression.value': a(p.fg, '99'),
    'debugTokenExpression.string': p.mint,
    'debugTokenExpression.number': p.mint,
    'debugTokenExpression.boolean': p.mint,
    'debugTokenExpression.error': p.coral,
    'debugView.exceptionLabelBackground': p.coral,
    'debugView.exceptionLabelForeground': p.onAccent,
    'debugView.stateLabelBackground': p.surface,
    'debugView.stateLabelForeground': p.fg,
    'debugView.valueChangedHighlight': p.lavender,
    'testing.iconPassed': p.mint,
    'testing.iconFailed': p.coral,
    'testing.iconErrored': p.coral,
    'testing.iconQueued': p.yellow,
    'testing.iconSkipped': p.subtle,
    'testing.iconUnset': p.subtle,
    'testing.runAction': p.mint,
    'testing.peekBorder': p.coral,
    'testing.message.error.decorationForeground': p.coral,
    'testing.message.error.lineBackground': a(p.coral, '26'),
    'testing.message.warning.decorationForeground': p.yellow,
    'testing.message.warning.lineBackground': a(p.yellow, '26'),
    'testing.message.info.decorationForeground': p.teal,
    'testing.message.info.lineBackground': a(p.teal, '26'),
    'testing.message.hint.decorationForeground': a(p.subtle, 'b3'),
    'problemsErrorIcon.foreground': p.coral,
    'problemsWarningIcon.foreground': p.yellow,
    'problemsInfoIcon.foreground': p.teal,

    // Notebooks
    'notebook.cellBorderColor': p.surface,
    'notebook.cellInsertionIndicator': p.violet,
    'notebook.cellStatusBarItemHoverBackground': a(p.ink, '26'),
    'notebook.cellToolbarSeparator': p.surface,
    'notebook.focusedCellBorder': p.violet,
    'notebook.focusedEditorBorder': p.violet,
    'notebook.focusedRowBorder': p.violet,
    'notebook.inactiveFocusedCellBorder': a(p.violet, '80'),
    'notebook.outputContainerBackgroundColor': p.bg,
    'notebook.rowHoverBackground': a(p.surface, '80'),
    'notebook.selectedCellBackground': p.surface,
    'notebook.selectedCellBorder': p.surface,
    'notebook.symbolHighlightBackground': a(p.ink, '0b'),
    'notebookScrollbarSlider.background': a(p.fg, light ? '26' : '1a'),
    'notebookScrollbarSlider.hoverBackground': a(p.fg, light ? '40' : '2e'),
    'notebookScrollbarSlider.activeBackground': a(p.fg, light ? '52' : '40'),
    'notebookStatusSuccessIcon.foreground': p.mint,
    'notebookStatusErrorIcon.foreground': p.coral,
    'notebookStatusRunningIcon.foreground': p.fg,

    // Symbols, charts, misc
    'symbolIcon.classForeground': p.yellow,
    'symbolIcon.constructorForeground': p.lavender,
    'symbolIcon.enumeratorForeground': p.yellow,
    'symbolIcon.enumeratorMemberForeground': p.teal,
    'symbolIcon.eventForeground': p.yellow,
    'symbolIcon.fieldForeground': p.teal,
    'symbolIcon.functionForeground': p.lavender,
    'symbolIcon.interfaceForeground': p.teal,
    'symbolIcon.methodForeground': p.lavender,
    'symbolIcon.variableForeground': p.teal,
    ...Object.fromEntries([
      'array', 'boolean', 'color', 'constant', 'file', 'folder', 'key', 'keyword',
      'module', 'namespace', 'null', 'number', 'object', 'operator', 'package',
      'property', 'reference', 'snippet', 'string', 'struct', 'text',
      'typeParameter', 'unit'
    ].map(symbol => [`symbolIcon.${symbol}Foreground`, p.fg])),
    'charts.foreground': p.fg,
    'charts.lines': a(p.fg, '80'),
    'charts.red': p.coral,
    'charts.orange': p.orange,
    'charts.yellow': p.yellow,
    'charts.green': p.mint,
    'charts.blue': p.lavender,
    'charts.purple': p.violet,
    'imagePreview.border': p.surface,
    'welcomePage.tileBackground': p.bg,
    'welcomePage.tileHoverBackground': p.surface,
    'welcomePage.progress.background': a(p.ink, '0d'),
    'welcomePage.progress.foreground': p.mint
  };
}

function tokenColors(p) {
  const rule = (scope, foreground, fontStyle) => ({
    scope,
    settings: fontStyle === undefined ? { foreground } : { foreground, fontStyle }
  });
  const call = a(p.fgStrong, 'd0');
  const jsonKey = depth => ['source.json']
    .concat(Array(depth).fill('meta.structure.dictionary.json meta.structure.dictionary.value.json'))
    .concat('meta.structure.dictionary.json support.type.property-name.json')
    .join(' ');

  return [
    // Comments
    rule(['comment', 'punctuation.definition.comment'], p.comment, ''),
    rule('meta.parameters comment.block', p.fg, ''),

    // Plain code
    rule(['meta.brace', 'punctuation', 'keyword.operator.existential'], p.fg),
    rule([
      'variable',
      'variable.other',
      'variable.parameter',
      'variable.other.property',
      'variable.other.object.property',
      'variable.other.constant.object',
      'variable.other.readwrite.alias',
      'support.variable.property',
      'meta.object-literal.key',
      'constant.other.placeholder',
      'meta.definition.variable variable.other.constant',
      'meta.definition.variable variable.other.readwrite',
      'string.unquoted.label.js'
    ], p.fgStrong),
    rule(['variable.language', 'variable.language.this', 'variable.language.super', 'variable.language.self'], p.teal, ''),

    // Keywords: one color for every keyword and storage word
    rule(['keyword', 'keyword.control', 'keyword.other', 'storage', 'storage.type', 'storage.modifier'], p.violet, ''),
    rule('keyword.operator', p.indigo),
    rule(['keyword.operator.new', 'keyword.control.new', 'keyword.operator.expression', 'keyword.operator.word'], p.violet),
    rule([
      'keyword.operator.delete',
      'keyword.operator.expression.delete',
      'keyword.operator.void',
      'keyword.operator.expression.void'
    ], p.coral),

    // Functions: declarations get the accent, calls stay near the variable color
    rule([
      'entity.name.function',
      'entity.name.function.method',
      'entity.name.method.js',
      'meta.class-method.js entity.name.function.js',
      'support.function.magic'
    ], p.lavender),
    rule([
      'variable.function',
      'meta.function-call entity.name.function',
      'meta.method-call entity.name.function',
      'meta.function-call support.function',
      'support.function.console',
      'punctuation.definition.entity.css'
    ], call),

    // Types
    rule([
      'entity.name',
      'entity.name.type',
      'entity.name.class',
      'entity.name.type.alias',
      'entity.name.namespace',
      'entity.other.inherited-class',
      'support.type',
      'support.type.sys-types',
      'support.other.namespace.php',
      'support.other.namespace.use.php',
      'meta.use.php',
      'variable.function.constructor'
    ], p.type),
    rule(['support.class', 'support.constant', 'support.variable', 'support.class.component'], p.teal),

    // Literals
    rule([
      'string',
      'string.unquoted',
      'string.regexp',
      'constant.numeric',
      'constant.character',
      'constant.character.escape',
      'constant.language',
      'constant.language.boolean',
      'constant.other.color',
      'constant.other.symbol',
      'constant.other.key',
      'keyword.other.unit',
      'support.constant.property-value',
      'support.constant.font-name',
      'support.constant.color'
    ], p.mint),
    rule([
      'constant.language.null',
      'constant.language.undefined',
      'constant.language.nil',
      'constant.language.none',
      'support.class.error',
      'invalid',
      'invalid.illegal',
      'invalid.deprecated'
    ], p.coral),
    rule([
      'punctuation.definition.template-expression',
      'punctuation.section.embedded',
      'keyword.other.template',
      'keyword.other.substitution'
    ], p.teal),

    // Markup languages
    rule(['entity.name.tag', 'meta.tag.sgml', 'entity.name.tag.css'], p.teal),
    rule([
      'meta.tag',
      'punctuation.definition.tag',
      'punctuation.definition.tag.begin.html',
      'punctuation.definition.tag.end.html',
      'punctuation.separator.inheritance.php'
    ], p.fg),
    rule('entity.other.attribute-name', p.indigo, ''),
    rule([
      'entity.other.attribute-name.class',
      'entity.other.attribute-name.id',
      'entity.other.attribute-name.pseudo-class',
      'entity.other.attribute-name.pseudo-element'
    ], p.teal),
    rule(['support.type.property-name', 'support.type.vendored.property-name'], p.fgStrong),
    rule([
      'keyword.other.important',
      'punctuation.decorator',
      'meta.decorator entity.name.function',
      'meta.decorator meta.function-call entity.name.function',
      'meta.decorator variable.other.readwrite',
      'entity.name.function.decorator',
      'punctuation.definition.decorator'
    ], p.teal),

    // JSON keys alternate by depth so nesting stays readable
    rule(jsonKey(0), p.fgStrong),
    rule(jsonKey(1), p.teal),
    rule(jsonKey(2), p.indigo),
    rule(jsonKey(3), p.subtle),
    rule(jsonKey(4), p.fgStrong),
    rule(jsonKey(5), p.teal),
    rule(jsonKey(6), p.indigo),
    rule(jsonKey(7), p.subtle),

    // Markdown
    rule(['text.html.markdown', 'punctuation.definition.list_item.markdown'], p.fgStrong),
    rule('meta.paragraph.markdown', call),
    rule([
      'markup.heading',
      'markup.heading entity.name',
      'entity.name.section.markdown',
      'markup.heading.setext.1.markdown',
      'markup.heading.setext.2.markdown'
    ], p.fgStrong, 'bold'),
    rule(['markup.bold', 'markup.bold string', 'markup.bold.markdown'], p.fgStrong, 'bold'),
    rule(['markup.italic', 'markup.italic.markdown'], p.lavender, ''),
    rule(['markup.bold markup.italic', 'markup.italic markup.bold'], p.lavender, 'bold'),
    rule('markup.underline', p.fgStrong, 'underline'),
    rule('markup.strike', p.muted, 'strikethrough'),
    rule('markup.quote', p.fg, ''),
    rule('markup.quote punctuation.definition.blockquote.markdown', p.muted),
    rule(['markup.inline.raw.markdown', 'markup.inline.raw.string.markdown', 'markup.raw.block', 'fenced_code.block.language'], p.teal),
    rule(['punctuation.definition.raw.markdown', 'variable.language.fenced.markdown'], p.indigo),
    rule(['punctuation.definition.fenced.markdown', 'markup.fenced_code.block.markdown punctuation.definition.markdown'], p.muted),
    rule([
      'punctuation.definition.markdown',
      'punctuation.definition.heading.markdown',
      'punctuation.definition.bold.markdown',
      'punctuation.definition.italic.markdown',
      'punctuation.definition.list.begin.markdown',
      'beginning.punctuation.definition.list.markdown',
      'markup.list.unnumbered.markdown punctuation.definition.list.begin.markdown'
    ], p.teal),
    rule([
      'string.other.link',
      'string.other.link.title.markdown',
      'string.other.link.description.markdown',
      'string.other.link.description.title.markdown',
      'constant.other.reference.link.markdown'
    ], p.teal, ''),
    rule(['markup.underline.link', 'markup.underline.link.markdown', 'markup.underline.link.image.markdown'], p.muted, 'underline'),
    rule(['meta.separator', 'meta.separator.markdown'], p.muted, ''),
    rule('markup.table', p.fg),

    // Diffs
    rule(['markup.inserted', 'markup.inserted.diff', 'meta.diff.header.to-file', 'punctuation.definition.to-file.diff'], p.mint),
    rule(['markup.deleted', 'markup.deleted.diff', 'meta.diff.header.from-file', 'punctuation.definition.from-file.diff'], p.coral),
    rule(['markup.changed', 'markup.changed.diff'], p.lavender),
    rule(['meta.diff.range', 'meta.diff.header', 'meta.diff.index'], p.muted),

    // Output channels and logs
    rule(['token.info-token', 'log.info'], p.teal),
    rule(['token.warn-token', 'log.warning'], p.yellow),
    rule(['token.error-token', 'log.error', 'log.exception'], p.coral),
    rule(['token.debug-token', 'log.debug'], p.fgStrong),
    rule('log.verbose', p.muted)
  ];
}

function semanticTokenColors(p) {
  const call = a(p.fgStrong, 'd0');
  return {
    comment: p.comment,
    variable: p.fgStrong,
    'variable.defaultLibrary': p.teal,
    parameter: p.fgStrong,
    property: p.fgStrong,
    function: call,
    'function.declaration': p.lavender,
    method: call,
    'method.declaration': p.lavender,
    type: p.type,
    class: p.type,
    'class.defaultLibrary': p.teal,
    interface: p.type,
    enum: p.type,
    typeParameter: p.type,
    namespace: p.type,
    string: p.mint,
    number: p.mint,
    regexp: p.mint,
    operator: p.indigo,
    keyword: p.violet,
    decorator: p.teal
  };
}

function buildTheme({ name, type, p }) {
  return {
    name,
    type,
    colors: colors(p, type),
    tokenColors: tokenColors(p),
    semanticHighlighting: true,
    semanticTokenColors: semanticTokenColors(p)
  };
}

function render(variant) {
  return `${JSON.stringify(buildTheme(variant), null, 2)}\n`;
}

module.exports = { variants, render };

if (require.main === module) {
  const check = process.argv.includes('--check');
  let stale = 0;
  for (const variant of variants) {
    const filePath = path.join(__dirname, '../themes', variant.file);
    const output = render(variant);
    if (check) {
      const current = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
      if (current !== output) {
        console.error(`Error: ${variant.file} is out of date. Run \`npm run build\`.`);
        stale++;
      }
    } else {
      fs.writeFileSync(filePath, output);
      console.log(`Wrote ${variant.file}`);
    }
  }
  if (stale > 0) process.exit(1);
}
