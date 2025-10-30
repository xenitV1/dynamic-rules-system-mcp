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


## Lisans
Herhangi bir lisans bulunmamaktadır; isteyen dilediği gibi kullanabilir.

## Geliştirici
Bu kural sistemi Mehmet (Xenit) tarafından geliştirilmiştir. https://x.com/xenit_v0

---
Bu README, `rules/` altındaki merkezi ve modüler kural sisteminin kısa ve pratik bir özetini sunar.
# Cursor Kural Sistemi - Sistem Diagramı ve Açıklama

## 📊 Genel Sistem Mimarisi

```mermaid
graph TB
    Start([👤 Kullanıcı İsteği]) --> ContextDetection[1️⃣ Context Detection<br/>⚠️ ZORUNLU ADIM]
    
    ContextDetection --> Analyze{Analiz}
    Analyze -->|PROJECT_TYPE| ProjType[new/existing/debugging/refactoring]
    Analyze -->|COMPLEXITY| Complex[simple/moderate/complex]
    Analyze -->|USER_INTENT| Intent[implementation/learning/fix/optimize]
    Analyze -->|FILE_COUNT| FileCount[1/few/many]
    Analyze -->|FILE_SIZE_STATUS| SizeStatus[safe/approaching/violation]
    
    ProjType --> RuleSelection[2️⃣ Kural Seti Seçimi]
    Complex --> RuleSelection
    Intent --> RuleSelection
    FileCount --> RuleSelection
    SizeStatus --> RuleSelection
    
    RuleSelection --> RuleSet{Rule Set}
    
    RuleSet -->|SET_001| Simple[Basit Görev<br/>1-2 dosya]
    RuleSet -->|SET_002| Complex[Karmaşık Proje<br/>Çoklu dosya]
    RuleSet -->|SET_003| Education[Öğretim Modu<br/>Learning focus]
    RuleSet -->|SET_004| Emergency[Acil Durum<br/>Kritik hata]
    RuleSet -->|SET_005| Violation[Boyut İhlali<br/>700+ satır]
    
    Simple --> LoadComp1[Component Yükleme<br/>language + file-size + clean-code + simple-handling]
    Complex --> LoadComp2[Component Yükleme<br/>language + file-size + clean-code + complex + analysis + mcp]
    Education --> LoadComp3[Component Yükleme<br/>language + education + clean-code]
    Emergency --> LoadComp4[Component Yükleme<br/>language + file-size + emergency + clean-code]
    Violation --> LoadComp5[Component Yükleme<br/>language + file-size BLOKAJ + analysis]
    
    LoadComp1 --> QualityGates[3️⃣ Kalite Gate'ler]
    LoadComp2 --> QualityGates
    LoadComp3 --> QualityGates
    LoadComp4 --> QualityGates
    LoadComp5 --> QualityGates
    
    QualityGates --> PreCheck[Pre-Implementation<br/>700+ kontrol<br/>Import audit<br/>Dependency check]
    
    PreCheck -->|❌ Blokaj| Block[🛑 İŞLEM DURDURULDU<br/>Refactoring Gerekli]
    PreCheck -->|✅ Geçerli| Implement[4️⃣ Implementation]
    
    Block --> Refactoring[Refactoring Plan<br/>Dosya bölme<br/>Import düzenleme]
    Refactoring --> PreCheck
    
    Implement --> DuringCheck[During Implementation<br/>Real-time monitoring<br/>Line count<br/>Complexity]
    
    DuringCheck -->|⚠️ Uyarı| Warn[Uyarı Mesajı<br/>Devam ediyor]
    DuringCheck -->|✅ Normal| Continue
    
    Warn --> PostCheck
    Continue --> PostCheck[Post-Implementation<br/>Final validation<br/>Quality score<br/>Cleanup]
    
    PostCheck -->|❌ Kalite düşük| Fix[Kalite Sorunları<br/>Düzeltme Gerekli]
    PostCheck -->|✅ Başarılı| Success[✅ İŞLEM TAMAMLANDI]
    
    Fix --> Implement
    
    Success --> Report[Rapor Formatı<br/>Türkçe açıklama<br/>Kalite metrikleri<br/>Optimizasyon önerileri]
    
    Report --> End([📄 Kullanıcıya Rapor])

    style Start fill:#4CAF50
    style Block fill:#F44336
    style Success fill:#4CAF50
    style ContextDetection fill:#FF9800
    style PreCheck fill:#FFC107
    style QualityGates fill:#2196F3
```

## 🧩 Component Yapısı ve İlişkiler

```mermaid
graph TD
    Master[rules.mdc<br/>🎯 MASTER CONTROLLER<br/>Priority: 0] --> Core[Core Components]
    Master --> Task[Task Handling]
    Master --> Protocol[Protocols]
    Master --> Special[Specialized]
    
    Core --> LR[language-rules.mdc<br/>🇹🇷 Türkçe/🇬🇧 İngilizce<br/>Priority: 2]
    Core --> FSE[file-size-enforcement.mdc<br/>📏 700-1000 satır<br/>Priority: 1 ⚡ KRİTİK]
    Core --> CCS[clean-code-standards.mdc<br/>🧹 Unused imports/Debug<br/>Priority: 2]
    
    Task --> STH[simple-task-handling.mdc<br/>⚡ Hızlı işlem<br/>Priority: 4<br/>No MCP tools]
    Task --> CPM[complex-project-management.mdc<br/>🏗️ Çoklu dosya<br/>Priority: 3]
    Task --> CA[codebase-analysis.mdc<br/>🔍 Kod analizi<br/>Priority: 5]
    
    Protocol --> EP[emergency-protocols.mdc<br/>🚨 Acil durum<br/>+50 satır max]
    Protocol --> MCP[mcp-tool-usage.mdc<br/>🔧 MCP kullanımı<br/>Seçici kullanım]
    
    Special --> ED[educational-approach.mdc<br/>📚 Öğretim modu<br/>Detaylı açıklama]
    Special --> QG[quality-gates.mdc<br/>✅ Kalite kontrol<br/>Otomatik validasyon<br/>Priority: 2]
    
    FSE -.->|Her zaman yüklenir| All[Diğer Tüm Componentler]
    LR -.->|İletişim standardı| All
    QG -.->|Kalite kontrolü| All
    
    style FSE fill:#F44336,color:#fff
    style Master fill:#2196F3,color:#fff
    style QG fill:#4CAF50,color:#fff
    style LR fill:#FF9800,color:#fff
```

## 🔄 Context Detection Akışı

```mermaid
flowchart TD
    UserQuery[Kullanıcı İsteği] --> CTX[Context Detection<br/>⚠️ ZORUNLU]
    
    CTX --> Eval1{PROJECT_TYPE?}
    Eval1 -->|new| NewProj[Yeni Proje]
    Eval1 -->|existing| ExistProj[Mevcut Proje]
    Eval1 -->|debugging| DebugProj[Hata Ayıklama]
    Eval1 -->|refactoring| RefactorProj[Refactoring]
    
    CTX --> Eval2{COMPLEXITY?}
    Eval2 -->|simple| SimpleComp[Basit]
    Eval2 -->|moderate| ModerateComp[Orta]
    Eval2 -->|complex| ComplexComp[Karmaşık]
    
    CTX --> Eval3{USER_INTENT?}
    Eval3 -->|implementation| Impl[Uygulama]
    Eval3 -->|learning| Learn[Öğrenme]
    Eval3 -->|fix| Fix[Düzeltme]
    Eval3 -->|optimize| Opt[Optimize Etme]
    
    CTX --> Eval4{FILE_SIZE_STATUS?}
    Eval4 -->|safe < 700| SafeSize[✅ Güvenli]
    Eval4 -->|approaching 700-999| ApproachSize[⚠️ Yaklaşıyor]
    Eval4 -->|violation 1000+| ViolateSize[❌ İhlal]
    
    NewProj --> Decision
    ExistProj --> Decision
    DebugProj --> Decision
    RefactorProj --> Decision
    
    SimpleComp --> Decision
    ModerateComp --> Decision
    ComplexComp --> Decision
    
    Impl --> Decision
    Learn --> Decision
    Fix --> Decision
    Opt --> Decision
    
    SafeSize --> Decision{Decision Engine}
    ApproachSize --> Decision
    ViolateSize --> Block[🛑 SET_005<br/>BLOKAJ MODU]
    
    Decision -->|File Count = 1<br/>Changes < 50| SET_001[SET_001<br/>Basit Görev]
    Decision -->|File Count > 2<br/>New Feature| SET_002[SET_002<br/>Karmaşık Proje]
    Decision -->|Intent = learning<br/>Complex = complex| SET_003[SET_003<br/>Öğretim Modu]
    Decision -->|Critical bug<br/>Security fix| SET_004[SET_004<br/>Acil Durum]
    
    SET_001 --> Load
    SET_002 --> Load
    SET_003 --> Load
    SET_004 --> Load
    
    Block --> LoadRefactor[Refactoring Gerekli]
    
    Load[Component Loading] --> Execute[Implementation]
    LoadRefactor --> Execute

    style CTX fill:#FF9800,color:#fff
    style Block fill:#F44336,color:#fff
    style Decision fill:#2196F3,color:#fff
```

## ⚙️ Kalite Gate Mekanizması

```mermaid
flowchart TD
    Start([Implementation Başladı]) --> Gate1[Gate 1: Pre-Implementation]
    
    Gate1 --> Check1{Dosya Boyutu?}
    Check1 -->|≥ 700| Block1[🛑 BLOKAJ<br/>Refactoring zorunlu]
    Check1 -->|< 700| Pass1[✅ Geçti]
    
    Gate1 --> Check2{Kullanılmayan Import?}
    Check2 -->|Var| Remove[Otomatik Temizle]
    Check2 -->|Yok| Pass2[✅ Geçti]
    
    Pass1 --> Gate2[Gate 2: During Implementation]
    Pass2 --> Gate2
    Remove --> Gate2
    
    Gate2 --> Monitor1[Real-time Monitoring]
    Monitor1 --> LineCount[Satır Sayısı Takibi]
    Monitor1 --> Complexity[Karmaşıklık Takibi]
    Monitor1 --> ImportTrack[Import Değişikliği]
    Monitor1 --> CodeSmell[Code Smell Detection]
    
    LineCount -->|> Threshold| Warn1[⚠️ Uyarı]
    Complexity -->|> Threshold| Warn2[⚠️ Uyarı]
    ImportTrack -->|Critical change| Warn3[⚠️ Uyarı]
    CodeSmell -->|Detected| Warn4[⚠️ Uyarı]
    
    Warn1 --> Gate3
    Warn2 --> Gate3
    Warn3 --> Gate3
    Warn4 --> Gate3[Gate 3: Post-Implementation]
    
    Gate3 --> FinalCheck[Final Validation]
    
    FinalCheck --> Score[Quality Score Calculation]
    Score --> W1[File Size: 25%]
    Score --> W2[Cleanliness: 25%]
    Score --> W3[Maintainability: 20%]
    Score --> W4[Performance: 15%]
    Score --> W5[Documentation: 15%]
    
    W1 --> Total[Total Score: 0-100]
    W2 --> Total
    W3 --> Total
    W4 --> Total
    W5 --> Total
    
    Total -->|≥ 70| Pass[✅ PASS<br/>İmplementasyon Onaylı]
    Total -->|< 70| Fail[❌ FAIL<br/>Kalite Düşük<br/>Düzeltme Gerekli]
    
    Fail --> Fix[Fix Required]
    Fix --> Gate1
    
    Pass --> Report[📊 Rapor Oluştur]
    Report --> End([✅ İşlem Tamamlandı])
    
    Block1 --> RefactorPlan[Refactoring Planı]
    RefactorPlan --> Gate1
    
    style Block1 fill:#F44336,color:#fff
    style Pass fill:#4CAF50,color:#fff
    style Fail fill:#F44336,color:#fff
    style Gate1 fill:#FFC107,color:#000
    style Gate3 fill:#2196F3,color:#fff
```

## 📦 Kural Setleri ve Component Yükleme

```mermaid
graph LR
    subgraph RuleSets[Kural Setleri]
        SET001[SET_001: Basit Görev<br/>Tek dosya, basit değişiklik]
        SET002[SET_002: Karmaşık Proje<br/>Çoklu dosya, yeni özellik]
        SET003[SET_003: Öğretim Modu<br/>Kullanıcı öğrenmeye odaklanmış]
        SET004[SET_004: Acil Durum<br/>Kritik hata düzeltme]
        SET005[SET_005: Boyut İhlali<br/>700+ satır tespit edildi]
    end
    
    subgraph Components[Component'ler]
        LR[language-rules.mdc]
        FSE[file-size-enforcement.mdc<br/>⚡ KRİTİK - HER ZAMAN]
        CCS[clean-code-standards.mdc]
        STH[simple-task-handling.mdc<br/>NO MCP TOOLS]
        CPM[complex-project-management.mdc]
        CA[codebase-analysis.mdc]
        EP[emergency-protocols.mdc]
        MCP[mcp-tool-usage.mdc]
        ED[educational-approach.mdc]
        QG[quality-gates.mdc]
    end
    
    SET001 --> LR
    SET001 --> FSE
    SET001 --> CCS
    SET001 --> STH
    
    SET002 --> LR
    SET002 --> FSE
    SET002 --> CCS
    SET002 --> CPM
    SET002 --> CA
    SET002 --> MCP
    
    SET003 --> LR
    SET003 --> ED
    SET003 --> CCS
    
    SET004 --> LR
    SET004 --> FSE
    SET004 --> EP
    SET004 --> CCS
    
    SET005 --> LR
    SET005 --> FSE
    SET005 --> CA
    
    style FSE fill:#F44336,color:#fff
    style SET001 fill:#4CAF50,color:#fff
    style SET005 fill:#F44336,color:#fff
    style STH fill:#FF9800,color:#fff
```

## 🎯 Öncelik Sırası ve Bağımlılıklar

```mermaid
graph TD
    subgraph PrioritySystem[Öncelik Sistemi]
        P0[Priority 0: Master Controller<br/>rules.mdc<br/>Merkezi koordinasyon]
        P1[Priority 1: File Size<br/>file-size-enforcement.mdc<br/>🚨 EN KRİTİK]
        P2[Priority 2: Core Rules<br/>language-rules.mdc<br/>clean-code-standards.mdc<br/>quality-gates.mdc]
        P3[Priority 3: Complex Tasks<br/>complex-project-management.mdc]
        P4[Priority 4: Simple Tasks<br/>simple-task-handling.mdc]
        P5[Priority 5: Analysis<br/>codebase-analysis.mdc]
    end
    
    P0 -->|Loads & Coordinates| P1
    P1 -->|Blocks if violation| All[All Other Components]
    
    P0 --> P2
    P2 --> P3
    P3 --> P4
    P3 --> P5
    
    P1 -->|Enforces| Enforcement[700 line limit<br/>1000 max hard limit<br/>Zero tolerance]
    
    P2 -->|Provides| Standards[Language rules<br/>Clean code<br/>Quality metrics]
    
    style P0 fill:#2196F3,color:#fff
    style P1 fill:#F44336,color:#fff
    style Enforcement fill:#F44336,color:#fff
    style All fill:#FFC107,color:#000
```

## 📊 Kalite Skorlama Sistemi

```mermaid
graph LR
    subgraph Metrics[Kalite Metrikleri]
        M1[File Size<br/>25%]
        M2[Code Cleanliness<br/>25%]
        M3[Maintainability<br/>20%]
        M4[Performance<br/>15%]
        M5[Documentation<br/>15%]
    end
    
    M1 -->|Weight| Calc[Score Calculation]
    M2 -->|Weight| Calc
    M3 -->|Weight| Calc
    M4 -->|Weight| Calc
    M5 -->|Weight| Calc
    
    Calc --> Score{Total Score}
    
    Score -->|≥ 90| Excellent[🟢 Excellent<br/>90-100]
    Score -->|70-89| Good[🟡 Good<br/>Kabul edilebilir]
    Score -->|< 70| Poor[🔴 Poor<br/>Düzeltme gerekli]
    
    Excellent --> Pass[✅ Implementation<br/>Approved]
    Good --> PassWithWarn[✅ Passed with<br/>⚠️ Warnings]
    Poor --> Block[❌ Implementation<br/>Blocked]
    
    Pass --> Report1[📄 Positive Report]
    PassWithWarn --> Report2[📄 Warning Report]
    Block --> Report3[📄 Blocking Report]
    
    style Score fill:#2196F3,color:#fff
    style Excellent fill:#4CAF50,color:#fff
    style Poor fill:#F44336,color:#fff
    style Block fill:#F44336,color:#fff
```

## 🔍 Dosya Boyutu Enforcement Detayı

```mermaid
flowchart TD
    FileMod[Kod Değişikliği İsteği] --> CheckSize{File Size Check}
    
    CheckSize -->|0-699 lines| Allow[✅ ALLOWED<br/>Implementation proceeds]
    CheckSize -->|700-999 lines| Warn[⚠️ WARNING<br/>Approaching limit]
    CheckSize -->|1000+ lines| Block[🛑 BLOCKED<br/>Absolute violation]
    
    Allow --> Normal[Normal Implementation]
    
    Warn -->|Continue with caution| Normal
    Warn -->|User choice| Refactor[Recommended Refactoring]
    
    Block --> Emergency{Is it emergency?}
    Emergency -->|No| Mandatory[🔄 MANDATORY REFACTORING<br/>Cannot add code]
    Emergency -->|Yes Critical Bug| EmergencyAllow[⚠️ Emergency Exception<br/>+50 lines max]
    
    Mandatory --> Refactor
    Refactor --> SplitFile[Split File]
    
    SplitFile --> CompSplit[Component Splitting]
    SplitFile --> UtilExtract[Utility Extraction]
    SplitFile --> HookExtract[Hook Extraction]
    SplitFile --> ServiceSep[Service Separation]
    SplitFile --> TypeDef[Type Definition Move]
    
    CompSplit --> Validate[Validate New Structure]
    UtilExtract --> Validate
    HookExtract --> Validate
    ServiceSep --> Validate
    TypeDef --> Validate
    
    Validate --> CheckAgain{Size Check Again}
    CheckAgain -->|Still > 1000| Block
    CheckAgain -->|< 1000| Allow
    
    EmergencyAllow --> Doc[Document Emergency Fix<br/>Refactor within 24h]
    Doc --> Normal
    
    Normal --> PostCheck{Post Implementation<br/>Size Check}
    PostCheck -->|≤ 1000| Success[✅ Success]
    PostCheck -->|> 1000| Violation[❌ Violation<br/>Rollback or Refactor]
    
    Violation --> SplitFile
    
    style Block fill:#F44336,color:#fff
    style EmergencyAllow fill:#FF9800,color:#fff
    style Warn fill:#FFC107,color:#000
    style Allow fill:#4CAF50,color:#fff
    style Success fill:#4CAF50,color:#fff
```

## 🎓 Öğretim Modu Akışı

```mermaid
flowchart TD
    Start([Kullanıcı Öğrenmek İstiyor]) --> Detect{Context Detection<br/>INTENT = learning<br/>COMPLEXITY = complex}
    
    Detect --> LoadEd[Load educational-approach.mdc]
    LoadEd --> LoadLang[Load language-rules.mdc]
    LoadLang --> LoadClean[Load clean-code-standards.mdc]
    
    LoadClean --> TeachingMode[🎓 Teaching Mode Activated]
    
    TeachingMode --> Explain1[1. Detailed Explanation<br/>Türkçe kapsamlı açıklama<br/>Nasıl çalışır?]
    
    Explain1 --> CodeExample1[2. Code Example<br/>İngilizce kod<br/>Best practices]
    
    CodeExample1 --> Explain2[3. Step-by-Step Guide<br/>Adım adım ilerleme<br/>Neden bu yaklaşım?]
    
    Explain2 --> QnA{Questions?}
    
    QnA -->|User has questions| Answer[Detailed Answer<br/>Ek kaynaklar<br/>İlgili örnekler]
    QnA -->|No questions| Continue
    
    Answer --> Continue[4. Implementation Guide]
    
    Continue --> Guide1[Implement with<br/>detailed comments]
    
    Guide1 --> Verify1[5. Verification<br/>Why this works]
    
    Verify1 --> TeachMore{More concepts?}
    
    TeachMore -->|Yes| Advanced[Advanced Topics<br/>Deep dive]
    TeachMore -->|No| Complete
    
    Advanced --> Complete[✅ Teaching Complete<br/>User learned concepts<br/>Ready to apply]
    
    Complete --> Report[📄 Educational Report<br/>What was learned<br/>Next steps<br/>Resources]
    
    style TeachingMode fill:#9C27B0,color:#fff
    style Explain1 fill:#4CAF50,color:#fff
    style Complete fill:#4CAF50,color:#fff
```

## ⚡ Basit Görev vs Karmaşık Görev Karşılaştırması

```mermaid
graph TB
    subgraph SimpleTask[⚡ Basit Görev Akışı]
        S1[1. Fast Check<br/>5 saniye] --> S2[2. Direct Implement<br/>NO MCP TOOLS<br/>Direkt kod yazımı]
        S2 --> S3[3. Quality Validate<br/>10 saniye<br/>Otomatik temizlik]
        S3 --> S4[✅ Done<br/>~2 dakika total]
    end
    
    subgraph ComplexTask[🏗️ Karmaşık Görev Akışı]
        C1[1. Context Analysis<br/>MCP tools kullanılır<br/>Codebase search] --> C2[2. Architecture Planning<br/>Çoklu dosya planı<br/>Dependency analysis]
        C2 --> C3[3. Sequential Planning<br/>Detaylı adım adım<br/>MCP thinking tool]
        C3 --> C4[4. Implementation<br/>Modüler yaklaşım<br/>Multiple files]
        C4 --> C5[5. Quality Gates<br/>Çok katmanlı kontrol<br/>Kapsamlı rapor]
        C5 --> C6[✅ Done<br/>~15-30 dakika total]
    end
    
    Decision{Which one?} -->|1-2 dosya<br/>< 50 lines<br/>Simple feature| SimpleTask
    Decision -->|> 2 dosya<br/>New architecture<br/>Complex feature| ComplexTask
    
    style SimpleTask fill:#4CAF50
    style ComplexTask fill:#2196F3
```

## 📋 İletişim Protokolü Akışı

```mermaid
flowchart LR
    subgraph Turkish[🇹🇷 TÜRKÇE İletişim]
        T1[Kullanıcı Açıklamaları]
        T2[Durum Bildirimleri]
        T3[Hata Mesajları]
        T4[Çözüm Önerileri]
        T5[Raporlar]
    end
    
    subgraph English[🇬🇧 İNGİLİZCE Kod]
        E1[Kod Yazımı]
        E2[Değişken İsimleri]
        E3[Dosya Adları]
        E4[Fonksiyon İsimleri]
        E5[API Documentation]
    end
    
    User[👤 Kullanıcı] -->|Türkçe Konuşur| Turkish
    Turkish -->|Açıklar| Explain[AI Açıklamaları<br/>Türkçe]
    
    Explain -->|Yazarken Kullanır| English
    English -->|Örneklerle Gösterir| Code[📝 Code Examples]
    
    Code -->|Türkçe Açıklar| Result[Sonuç: Hibrit İletişim<br/>✅ Kullanıcı dilinde öğrenme<br/>✅ Uluslararası kod standardı]
    
    style Turkish fill:#FF9800
    style English fill:#2196F3
    style Result fill:#4CAF50
```

## 🔗 Component Bağımlılık Ağı

```mermaid
graph TD
    Master[rules.mdc<br/>Master Controller] --> Core[Core Layer]
    
    Core --> LR[language-rules.mdc]
    Core --> FSE[file-size-enforcement.mdc<br/>⚡ HIGHEST PRIORITY]
    Core --> CCS[clean-code-standards.mdc]
    
    Master --> QG[quality-gates.mdc]
    
    LR -->|Communication standard| All1[All Components]
    FSE -->|Blocks if violated| All2[All Implementation]
    CCS -->|Auto-cleanup| All3[All Code Changes]
    QG -->|Validates| All4[All Quality]
    
    Simple[simple-task-handling.mdc] --> FSE
    Complex[complex-project-management.mdc] --> FSE
    Education[educational-approach.mdc] --> LR
    
    Simple -->|No MCP for speed| Apply1[Direct Implementation]
    Complex -->|Uses MCP tools| Apply2[Planned Implementation]
    
    FSE -.->|Enforces| Limit[700 Line Limit<br/>1000 Hard Limit]
    
    All1 --> Final[Final Output]
    All2 --> Final
    All3 --> Final
    All4 --> Final
    
    style FSE fill:#F44336,color:#fff
    style Master fill:#2196F3,color:#fff
    style Limit fill:#F44336,color:#fff
```

## 📈 Sistem Metrikleri ve Raporlama

```mermaid
flowchart TD
    subgraph Implementation[Implementation Phase]
        I1[Code Written] --> M1[Lines Added]
        I1 --> M2[Files Modified]
        I1 --> M3[Complexity Added]
    end
    
    subgraph Quality[Quality Phase]
        Q1[Pre-Check] --> Q2[During-Check]
        Q2 --> Q3[Post-Check]
    end
    
    M1 --> Q1
    M2 --> Q1
    M3 --> Q1
    
    Q3 --> Calculate[Calculate Metrics]
    
    Calculate --> S1[File Size Score<br/>25% weight]
    Calculate --> S2[Cleanliness Score<br/>25% weight]
    Calculate --> S3[Maintainability Score<br/>20% weight]
    Calculate --> S4[Performance Score<br/>15% weight]
    Calculate --> S5[Documentation Score<br/>15% weight]
    
    S1 --> Total[Total Quality Score<br/>0-100]
    S2 --> Total
    S3 --> Total
    S4 --> Total
    S5 --> Total
    
    Total --> Report[Generate Report]
    
    Report --> User[👤 User Receives<br/>Turkish Report]
    
    User -->|Content includes| Content[• Overall Score<br/>• Breakdown by category<br/>• Issues found<br/>• Recommendations<br/>• Implementation status]
    
    style Calculate fill:#2196F3,color:#fff
    style Total fill:#FF9800,color:#fff
    style Report fill:#4CAF50,color:#fff
```

## 🎯 Özet: Sistem Nasıl Çalışır?

### 1️⃣ Context Detection (Zorunlu İlk Adım)
- Her kullanıcı isteğinde otomatik analiz yapılır
- Proje tipi, karmaşıklık, kullanıcı niyeti, dosya durumu belirlenir
- Bu analiz sonucuna göre kural seti seçilir

### 2️⃣ Rule Set Selection (Dinamik Yükleme)
- `SET_001`: Basit görevler (1-2 dosya, <50 satır)
- `SET_002`: Karmaşık projeler (çoklu dosya, yeni özellik)
- `SET_003`: Öğretim modu (detaylı açıklamalar)
- `SET_004`: Acil durum (kritik hata, +50 satır max)
- `SET_005`: Boyut ihlali (700+ satır, blokaj modu)

### 3️⃣ Component Loading (Modüler Sistem)
- Seçilen kural setine göre ilgili component'ler yüklenir
- `file-size-enforcement.mdc` her zaman yüklenir (en kritik)
- `language-rules.mdc` her zaman yüklenir (iletişim standardı)

### 4️⃣ Quality Gates (Çok Katmanlı Kontrol)
- **Pre-Implementation**: Dosya boyutu, import audit, dependency check
- **During Implementation**: Real-time monitoring, complexity tracking
- **Post-Implementation**: Final validation, quality score (0-100)

### 5️⃣ Enforcement (Mutlak Kurallar)
- Dosya boyutu: 700 satır → uyarı, 1000 satır → blokaj
- Unused imports: Otomatik kaldırılır
- Dead code: Otomatik temizlenir
- Single responsibility: Zorunlu

### 6️⃣ Reporting (Türkçe Açıklama)
- Kullanıcıya her zaman Türkçe açıklama yapılır
- Kalite skoru, metrikler, öneriler sunulur
- Kod örnekleri İngilizce standartlarda tutulur

## 🔑 Temel Prensipler

### ⚡ Performance
- Basit görevlerde MCP tool kullanılmaz (hız optimizasyonu)
- Sadece gerekli component'ler yüklenir
- Direct implementation tercih edilir

### 🎯 Quality
- Sıfır tolerans: Unused imports, dead code, empty functions
- Automatic enforcement: Kullanıcıya sorulmadan temizlenir
- Single responsibility: Her component tek görev yapar

### 📏 File Size (EN KRİTİK)
- Hard limit: 1000 satır
- Warning threshold: 700 satır
- Blokaj: 700+ satırda yeni kod yok
- Acil durum: Sadece kritik hatalar için +50 satır

### 🇹🇷 Communication
- Kullanıcı ile Türkçe konuşulur
- Kod İngilizce yazılır
- Raporlar Türkçe sunulur

## 📚 Kaynaklar

- [Cursor Rules Documentation](https://cursor.com/tr/docs/context/rules)
- Proje kuralları: `.cursor/rules/` klasörü
- Master controller: `.cursor/rules/rules.mdc`

---

*Bu diagram Cursor kural sisteminin nasıl çalıştığını görsel olarak açıklar. Sistem modüler, akıllı ve kalite odaklı bir yapıda tasarlanmıştır.*

