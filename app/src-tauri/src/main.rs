//! Tauri backend: diálogos nativos y IO básico.
//! Próximos commits: Import SpriteFusion ZIP con parseo en memoria y retorno a frontend.

#![cfg_attr(all(not(debug_assertions), target_os = "windows"), windows_subsystem = "windows")]

use tauri::{Manager};
use serde::{Deserialize, Serialize};
use anyhow::Result;

#[tauri::command]
fn cmd_open_project_dialog(app: tauri::AppHandle) -> Option<String> {
    use tauri::api::dialog::blocking::FileDialogBuilder;
    
    FileDialogBuilder::new()
        .add_filter("MSX Project", &["msxproj"])
        .pick_file()
        .and_then(|path| path.to_str().map(|s| s.to_owned()))
}

#[tauri::command] 
fn cmd_save_project_dialog(app: tauri::AppHandle, default_path: Option<String>) -> Option<String> {
    use tauri::api::dialog::blocking::FileDialogBuilder;
    
    let mut dialog = FileDialogBuilder::new();
    if let Some(path) = default_path {
        dialog = dialog.set_file_name(&path);
    }
    
    dialog
        .add_filter("MSX Project", &["msxproj"])
        .save_file()
        .and_then(|path| path.to_str().map(|s| s.to_owned()))
}

#[derive(Serialize)]
struct SaveResult {
    path: Option<String>,
    ok: bool,
    error: Option<String>,
}

#[tauri::command]
fn cmd_write_file(path: String, contents: String) -> SaveResult {
    match std::fs::write(&path, contents) {
        Ok(_) => SaveResult {
            path: Some(path),
            ok: true,
            error: None,
        },
        Err(e) => SaveResult {
            path: None,
            ok: false,
            error: Some(e.to_string()),
        },
    }
}

#[tauri::command]
fn cmd_read_file(path: String) -> Result<String, String> {
    std::fs::read_to_string(path).map_err(|e| e.to_string())
}

#[derive(Serialize)]
struct SpriteFusionImport {
    map_json: String,
    image_path: String,
}

#[tauri::command]
fn cmd_import_spritfusion_zip_dialog(app: tauri::AppHandle) -> Option<SpriteFusionImport> {
    use tauri::api::dialog::blocking::FileDialogBuilder;
    
    // Placeholder implementation - would need ZIP parsing logic
    FileDialogBuilder::new()
        .add_filter("ZIP Files", &["zip"])
        .pick_file()
        .and_then(|path| {
            // This would contain ZIP parsing logic in a real implementation
            // For now, return None as placeholder
            None
        })
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            cmd_open_project_dialog,
            cmd_save_project_dialog,
            cmd_write_file,
            cmd_read_file,
            cmd_import_spritfusion_zip_dialog
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}