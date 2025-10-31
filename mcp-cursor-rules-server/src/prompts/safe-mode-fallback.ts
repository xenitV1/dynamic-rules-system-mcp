export function handleSafeModeFallback() {
  return {
    safeMode: true,
    behaviors: [
      'no_github_push_without_consent',
      'no_file_growth_beyond_700_lines',
      'remove_unused_imports_and_dead_code'
    ]
  };
}


