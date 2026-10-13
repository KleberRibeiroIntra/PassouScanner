import {
  AppShell,
  Button,
  Card,
  Menu,
  Modal,
  Notification,
  Paper,
  Popover,
  Table,
  createTheme,
  type CSSVariablesResolver,
  type MantineColorsTuple,
} from '@mantine/core'
import buttonClasses from './styles/button.module.css'

const palette = {
  charcoal: '#101216',
  graphite: '#27272A',
  slate: '#52525B',
  silver: '#A1A1AA',
  mist: '#D4D4D8',
  cloud: '#F4F4F5',
  white: '#FAFAFA',
  accent: '#71717A',
}

const derived = {
  zinc200: '#E4E4E7',
  zinc700: '#3F3F46',
  zinc900: '#18181B',
}

const accent: MantineColorsTuple = [
  palette.white,
  palette.cloud,
  derived.zinc200,
  palette.mist,
  palette.silver,
  palette.accent,
  palette.slate,
  derived.zinc700,
  palette.graphite,
  derived.zinc900,
]

const red: MantineColorsTuple = [
  '#fef2f2',
  '#fee2e2',
  '#fecaca',
  '#fca5a5',
  '#f87171',
  '#ef4444',
  '#dc2626',
  '#b91c1c',
  '#991b1b',
  '#7f1d1d',
]

const dark: MantineColorsTuple = [
  palette.cloud,
  palette.mist,
  palette.silver,
  palette.accent,
  palette.slate,
  derived.zinc700,
  palette.graphite,
  derived.zinc900,
  palette.charcoal,
  '#0b0c0f',
]

export const theme = createTheme({
  primaryColor: 'accent',
  primaryShade: { light: 5, dark: 5 },
  colors: { accent, red, dark },
  autoContrast: true,
  defaultRadius: 'md',
  cursorType: 'pointer',

  fontFamily: "'Inter Variable', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  fontFamilyMonospace: "ui-monospace, 'Cascadia Code', 'SF Mono', Consolas, monospace",
  headings: {
    fontWeight: '600',
    sizes: {
      h1: { fontSize: '1.75rem', lineHeight: '1.25' },
      h2: { fontSize: '1.375rem', lineHeight: '1.3' },
      h3: { fontSize: '1.125rem', lineHeight: '1.35' },
      h4: { fontSize: '1rem', lineHeight: '1.4' },
    },
  },

  shadows: {
    xs: '0 1px 1px rgb(0 0 0 / 0.04)',
    sm: '0 1px 2px rgb(0 0 0 / 0.06)',
    md: '0 2px 6px rgb(0 0 0 / 0.08)',
    lg: '0 4px 12px rgb(0 0 0 / 0.1)',
    xl: '0 8px 24px rgb(0 0 0 / 0.12)',
  },

  components: {
    AppShell: AppShell.extend({
      styles: {
        header: { backgroundColor: 'var(--app-surface)', color: 'var(--app-surface-foreground)' },
        main: { backgroundColor: 'var(--app-bg)' },
      },
    }),
    Button: Button.extend({
      classNames: { root: buttonClasses.root },
    }),
    Card: Card.extend({
      defaultProps: { withBorder: true, shadow: 'none', padding: 'lg' },
      styles: { root: { backgroundColor: 'var(--app-surface)', color: 'var(--app-surface-foreground)' } },
    }),
    Paper: Paper.extend({
      defaultProps: { shadow: 'none' },
    }),
    Modal: Modal.extend({
      defaultProps: { shadow: 'md', overlayProps: { backgroundOpacity: 0.5, blur: 2 } },
      styles: {
        content: {
          backgroundColor: 'var(--app-surface-raised)',
          color: 'var(--app-surface-raised-foreground)',
          border: '1px solid var(--mantine-color-default-border)',
        },
        header: { backgroundColor: 'var(--app-surface-raised)' },
      },
    }),
    Menu: Menu.extend({
      defaultProps: { shadow: 'md' },
      styles: { dropdown: { backgroundColor: 'var(--app-surface-raised)', color: 'var(--app-surface-raised-foreground)' } },
    }),
    Popover: Popover.extend({
      defaultProps: { shadow: 'md' },
      styles: { dropdown: { backgroundColor: 'var(--app-surface-raised)', color: 'var(--app-surface-raised-foreground)' } },
    }),
    Notification: Notification.extend({
      defaultProps: { withBorder: true },
      styles: { root: { backgroundColor: 'var(--app-surface-raised)' } },
    }),
    Table: Table.extend({
      defaultProps: {
        stripedColor: 'var(--app-row-striped)',
        highlightOnHoverColor: 'var(--app-row-hover)',
        borderColor: 'var(--mantine-color-default-border)',
      },
    }),
  },
})

export const cssVariablesResolver: CSSVariablesResolver = () => ({
  variables: {},
  light: {
    '--app-bg': palette.cloud,
    '--app-surface': palette.white,
    '--app-surface-foreground': palette.charcoal,
    '--app-surface-raised': '#ffffff',
    '--app-surface-raised-foreground': palette.charcoal,
    '--app-row-striped': palette.cloud,
    '--app-row-hover': derived.zinc200,
    '--app-input-bg': '#ffffff',
    '--app-input-border': palette.silver,
    '--app-ring': palette.slate,
    '--mantine-color-body': palette.white,
    '--mantine-color-text': palette.charcoal,
    '--mantine-color-bright': palette.charcoal,
    '--mantine-color-dimmed': palette.slate,
    '--mantine-color-placeholder': palette.accent,
    '--mantine-color-default': '#ffffff',
    '--mantine-color-default-color': palette.graphite,
    '--mantine-color-default-hover': palette.cloud,
    '--mantine-color-default-border': palette.mist,
    '--mantine-color-disabled': palette.cloud,
    '--mantine-color-disabled-color': palette.silver,
    '--mantine-color-disabled-border': palette.mist,
    '--mantine-color-gray-light': palette.cloud,
    '--mantine-color-gray-light-hover': derived.zinc200,
    '--mantine-color-gray-light-color': palette.graphite,
    '--mantine-color-error': red[6],
  },
  dark: {
    '--app-bg': palette.charcoal,
    '--app-surface': derived.zinc900,
    '--app-surface-foreground': palette.white,
    '--app-surface-raised': palette.graphite,
    '--app-surface-raised-foreground': palette.cloud,
    '--app-row-striped': '#1f1f23',
    '--app-row-hover': palette.graphite,
    '--app-input-bg': palette.graphite,
    '--app-input-border': palette.slate,
    '--app-ring': palette.silver,
    '--mantine-color-body': derived.zinc900,
    '--mantine-color-text': palette.white,
    '--mantine-color-bright': palette.white,
    '--mantine-color-dimmed': palette.silver,
    '--mantine-color-placeholder': palette.silver,
    '--mantine-color-default': palette.graphite,
    '--mantine-color-default-color': palette.mist,
    '--mantine-color-default-hover': derived.zinc700,
    '--mantine-color-default-border': derived.zinc700,
    '--mantine-color-disabled': palette.graphite,
    '--mantine-color-disabled-color': palette.accent,
    '--mantine-color-disabled-border': derived.zinc700,
    '--mantine-color-gray-light': palette.graphite,
    '--mantine-color-gray-light-hover': derived.zinc700,
    '--mantine-color-gray-light-color': palette.cloud,
    '--mantine-color-error': red[5],
  },
})
