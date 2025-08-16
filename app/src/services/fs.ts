import { invoke } from '@tauri-apps/api/tauri';

export interface SaveResult { path: string | null; ok: boolean; error?: string; }

export async function openProjectDialog(): Promise<string | null> {
  return invoke<string | null>('cmd_open_project_dialog');
}

export async function saveProjectDialog(defaultPath?: string): Promise<string | null> {
  return invoke<string | null>('cmd_save_project_dialog', { defaultPath });
}

export async function writeFile(path: string, contents: string): Promise<SaveResult> {
  return invoke<SaveResult>('cmd_write_file', { path, contents });
}

export async function readFile(path: string): Promise<string> {
  return invoke<string>('cmd_read_file', { path });
}

export async function importSpriteFusionZipDialog(): Promise<{ mapJson: string; imagePath: string } | null> {
  return invoke<{ mapJson: string; imagePath: string } | null>('cmd_import_spritfusion_zip_dialog');
}