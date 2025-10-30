# Cursor Dynamic Rules System

Bu depo, Cursor için merkezi ve dinamik bir kural yönetim sistemi sağlar. Amaç; görev bağlamına göre doğru kural setini otomatik seçmek, zorunlu kalite kapılarını (quality gates) uygulamak ve tutarlı bir iletişim/uygulama standardı sağlamaktır.

## Özellikler (Kısa Özet)
- Dinamik kural seçimi (context-based) ve modüler component mimarisi
- Zorunlu ve sıfır toleranslı kalite kuralları (dosya boyutu, temiz kod, iletişim)
- Durum bazlı kural setleri (Basit Görev, Karmaşık Proje, Öğretim Modu, Acil Durum, Boyut İhlali)
- Windows 11 + PowerShell bağlamı ve GitHub izni kontrolleri

## Depo Yapısı
```
rules/
  core/
    clean-code-standards.mdc
    file-size-enforcement.mdc
    language-rules.mdc
  protocols/
    emergency-protocols.mdc
    mcp-tool-usage.mdc
  specialized/
    educational-approach.mdc
    quality-gates.mdc
  task-handling/
    codebase-analysis.mdc
    complex-project-management.mdc
    simple-task-handling.mdc
  rules.mdc  (Merkezi yönetim dosyası)
```

## Merkezi Dosya: `rules/rules.mdc`
- Ana kontrol düzeneğidir; bağlam tespiti (context detection), platform ve izin kontrolü, dinamik kural seti seçimi ve component yüklemeyi tanımlar.
- Zorunlu prensipler:
  - Kullanıcı iletişimi Türkçe, kod ve teknik içerik İngilizce
  - Dosya boyutu limiti: 700–1000 satır (700+ satırda yeni kod eklenemez)
  - Temiz kod ve kalite kapıları her zaman aktif

## Çekirdek Bileşenler (`rules/core`)
- `language-rules.mdc`: Kullanıcıya Türkçe iletişim, kodu İngilizce yazma standardı.
- `file-size-enforcement.mdc`: MUTLAK dosya boyutu kontrolü; 700+ satırda blokaj ve refactoring zorunluluğu.
- `clean-code-standards.mdc`: Unused import/ dead code temizliği, tek sorumluluk ilkesi, minimal uygulama.

## Protokoller (`rules/protocols`)
- `emergency-protocols.mdc`: Kritik durumlarda (security/production crash) sınırlı satır istisnası (+50) ve zorunlu sonrası refactoring.
- `mcp-tool-usage.mdc`: MCP araçlarının akıllı ve seçici kullanımı (sadece karmaşık/çok adımlı veya bilinmeyen teknoloji durumları).

## Uzmanlaşmış Bileşenler (`rules/specialized`)
- `educational-approach.mdc`: Öğretim odaklı, adım adım Türkçe açıklama; kod örnekleri İngilizce.
- `quality-gates.mdc`: Öncesi/sonrası kalite kapıları ve metrikler (file size, cleanliness, maintainability, vs.).

## Görev İşleme (`rules/task-handling`)
- `simple-task-handling.mdc`: Tek dosyalı/sade değişikliklerde hızlı uygulama.
- `complex-project-management.mdc`: Çoklu dosya, mimari planlama ve koordinasyon.
- `codebase-analysis.mdc`: İmplementasyondan önce zorunlu codebase analizi ve boyut denetimi.

## Dinamik Kural Setleri
- SET_001: Basit Görev → core + simple-task-handling
- SET_002: Karmaşık Proje → core + complex + analysis + mcp-tool-usage
- SET_003: Öğretim Modu → language + educational + clean-code
- SET_004: Acil Durum → language + file-size (esnek) + emergency + clean-code
- SET_005: Dosya Boyutu İhlali → language + file-size (tam blokaj) + analysis

## Zorunlu Kalite Kuralları (Zero Tolerance)
- Unused import, dead code, empty functions: Derhal kaldırılır
- Tek sorumluluk ilkesi ve minimal uygulama: Zorunlu
- Dosya boyutu: 700+ satırda yeni kod eklenemez (acil durum hariç, +50 satır sınırı)

## Çalışma Akışı (Özet)
1) Context Detection → Platform (Windows 11/PowerShell) → GitHub izin kontrolü
2) Dinamik kural seti seçimi ve component yükleme
3) Pre-implementation kontrolleri (dosya boyutu, import audit, kalite taraması)
4) Uygulama (gerekirse blokaj & refactor) → Post-implementation kalite doğrulaması

## Cursor Ayarı: User Rules (ZORUNLU)
Bu kural yapısının sorunsuz çalışması için Cursor içinde şu ayarı yapın:
- Settings → Rules, Memories... → User Rules
- Aşağıdaki içeriği eksiksiz yapıştırın ve kaydedin:
```
---
description: Kurallar yüklenmeden/kesinleşmeden kullanıcı talebi işlenemez; merkezi kural setiyle uyumlu kapı (gate).

# 🚨 KRİTİK İLETİŞİM KURALI
communication:
  tone: "realistic"
  principle: |
    ⚠️ Kullanıcı ile GERÇEKÇİ konuşulacak. 
    ❌ ASLA iyimser olunmayacak!
    ✓ Riskler açıkça belirtilecek
    ✓ Sorunlar net ifade edilecek
    ✓ Gerçekçi beklentiler sunulacak

globs:
  - "**/*"
alwaysApply: true
priority: 100
type: gatekeeper
enforcement:
  requireRulesLoaded: true
  blockIfMissing: true
  failMessage: |
    🛑 İŞLEM DURDURULDU
    ❌ Sebep: Kural setleri yüklenmeden kullanıcı talebi işlenemez.
    📋 Adımlar:
      1) Merkezi dosya `@rules.mdc` ve tüm component'leri yükle
      2) Zorunlu bileşenleri doğrula: file-size-enforcement, clean-code-standards
      3) Talebi tekrar çalıştır
policy:
  orderOfOperations:
    - "context_detection"
    - "platform_check_windows11"
    - "github_permission_check"
    - "load_central_rules_file"
    - "load_user_and_project_rules"
    - "select_rule_set_dynamically"
    - "validate_mandatory_components"
    - "process_user_query"
responses:
  blockedTemplate: |
    🛑 İŞLEM DURDURULDU
    ❌ Sebep: Kurallar eksik/yüklenmedi.
    📏 Dosya boyutu kuralı aktif (700+ satırda ek kod YOK).
    🔧 Gerekli aksiyon: Kuralları yükle ve zorunlu bileşenleri doğrula.
  warnTemplate: |
    ⚠️ UYARI: Kurallar kısmen yüklendi. Güvenli mod önerilir.
defaults:
  language:
    userCommunication: "tr"
    codeAndTech: "en"
  safeMode:
    enabledIfPartialRules: true
    behaviors:
      - "no_github_push_without_consent"
      - "no_file_growth_beyond_700_lines"
      - "remove_unused_imports_and_dead_code"
audit:
  postImplementationChecks:
    - "no_unused_imports"
    - "no_dead_code"
    - "single_responsibility"
    - "minimal_implementation"
    - "file_size_compliance"
```

## Kullanım
- Kuralları proje kökünde `.cursor/rules/` altında koruyun.
- Yeni görevde önce `rules/rules.mdc` içeriğine göre bağlam tespiti ve kural seti seçimini uygulayın.

## Kurulum ve Remote Depo
Bu repo şu uzak depoya itilebilir: `https://github.com/xenitV1/cursor-dynamic-rules-system.git`

Önerilen adımlar (PowerShell):
```
# Proje kökünde çalışın
git init
git add .
git commit -m "chore: initialize rules system and README"

# Ana dalı ayarla
git branch -M main

# Uzak repo ekle
git remote add origin https://github.com/xenitV1/cursor-dynamic-rules-system.git

# İlk push
git push -u origin main
```
Not: GitHub kimlik doğrulaması (PAT/SSO) gerekebilir.

## Lisans
Herhangi bir lisans bulunmamaktadır; isteyen dilediği gibi kullanabilir.

## Geliştirici
Bu kural sistemi Mehmet (Xenit) tarafından geliştirilmiştir. https://x.com/xenit_v0

---
Bu README, `rules/` altındaki merkezi ve modüler kural sisteminin kısa ve pratik bir özetini sunar.
