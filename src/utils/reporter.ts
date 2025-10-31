import type { UserPreferences } from '../types/preferences.js';
import type { QualityGateResult } from '../types/quality.js';
import type { ContextDetectionResult } from '../types/context.js';

export class Reporter {
  /**
   * Generate quality gate report based on language preference
   */
  static generateQualityReport(result: QualityGateResult, preferences: UserPreferences): string {
    const lang = preferences.language.userCommunication;
    
    if (lang === 'tr') {
      return this.generateQualityReportTurkish(result);
    } else {
      return this.generateQualityReportEnglish(result);
    }
  }
  
  private static generateQualityReportTurkish(result: QualityGateResult): string {
    let report = '✅ KALİTE GATE RAPORU\n';
    report += `📊 Genel Skor: ${result.overallScore}/100 `;
    
    switch (result.status) {
      case 'passed':
        report += '(BAŞARILI)\n';
        break;
      case 'passed-with-warnings':
        report += '(UYARILI)\n';
        break;
      case 'failed':
        report += '(BAŞARISIZ)\n';
        break;
      case 'blocked':
        report += '(BLOKE)\n';
        break;
    }
    
    report += '\n🎯 KALİTE BREAKDOWN:\n';
    report += `   📏 Dosya Boyutu: ${result.breakdown.fileSize.score}/100 - ${result.breakdown.fileSize.status.toUpperCase()}\n`;
    report += `   🧹 Kod Temizliği: ${result.breakdown.cleanliness.score}/100 - ${result.breakdown.cleanliness.status.toUpperCase()}\n`;
    report += `   🔧 Sürdürülebilirlik: ${result.breakdown.maintainability.score}/100 - ${result.breakdown.maintainability.status.toUpperCase()}\n`;
    report += `   ⚡ Performans: ${result.breakdown.performance.score}/100 - ${result.breakdown.performance.status.toUpperCase()}\n`;
    report += `   📚 Dokümantasyon: ${result.breakdown.documentation.score}/100 - ${result.breakdown.documentation.status.toUpperCase()}\n`;
    
    if (result.blockers.length > 0) {
      report += '\n🔍 TESPİT EDİLEN SORUNLAR:\n';
      result.blockers.forEach((blocker, i) => {
        report += `   ${i + 1}. ${blocker}\n`;
      });
    }
    
    if (result.recommendations.length > 0) {
      report += '\n💡 İYİLEŞTİRME ÖNERİLERİ:\n';
      result.recommendations.forEach((rec, i) => {
        report += `   ${i + 1}. ${rec}\n`;
      });
    }
    
    report += `\n✅ SONUÇ: ${result.status === 'passed' ? 'İmplementasyon onaylandı' : result.status === 'blocked' ? 'İmplementasyon bloke edildi' : 'Düzeltme gerekli'}`;
    
    return report;
  }
  
  private static generateQualityReportEnglish(result: QualityGateResult): string {
    let report = '✅ QUALITY GATE REPORT\n';
    report += `📊 Overall Score: ${result.overallScore}/100 `;
    
    switch (result.status) {
      case 'passed':
        report += '(PASSED)\n';
        break;
      case 'passed-with-warnings':
        report += '(WARNINGS)\n';
        break;
      case 'failed':
        report += '(FAILED)\n';
        break;
      case 'blocked':
        report += '(BLOCKED)\n';
        break;
    }
    
    report += '\n🎯 QUALITY BREAKDOWN:\n';
    report += `   📏 File Size: ${result.breakdown.fileSize.score}/100 - ${result.breakdown.fileSize.status.toUpperCase()}\n`;
    report += `   🧹 Cleanliness: ${result.breakdown.cleanliness.score}/100 - ${result.breakdown.cleanliness.status.toUpperCase()}\n`;
    report += `   🔧 Maintainability: ${result.breakdown.maintainability.score}/100 - ${result.breakdown.maintainability.status.toUpperCase()}\n`;
    report += `   ⚡ Performance: ${result.breakdown.performance.score}/100 - ${result.breakdown.performance.status.toUpperCase()}\n`;
    report += `   📚 Documentation: ${result.breakdown.documentation.score}/100 - ${result.breakdown.documentation.status.toUpperCase()}\n`;
    
    if (result.blockers.length > 0) {
      report += '\n🔍 ISSUES FOUND:\n';
      result.blockers.forEach((blocker, i) => {
        report += `   ${i + 1}. ${blocker}\n`;
      });
    }
    
    if (result.recommendations.length > 0) {
      report += '\n💡 RECOMMENDATIONS:\n';
      result.recommendations.forEach((rec, i) => {
        report += `   ${i + 1}. ${rec}\n`;
      });
    }
    
    report += `\n✅ RESULT: ${result.status === 'passed' ? 'Implementation approved' : result.status === 'blocked' ? 'Implementation blocked' : 'Fixes required'}`;
    
    return report;
  }
  
  /**
   * Generate context detection report
   */
  static generateContextReport(result: ContextDetectionResult, preferences: UserPreferences): string {
    const lang = preferences.language.userCommunication;
    
    if (lang === 'tr') {
      return this.generateContextReportTurkish(result);
    } else {
      return this.generateContextReportEnglish(result);
    }
  }
  
  private static generateContextReportTurkish(result: ContextDetectionResult): string {
    let report = '🔍 CONTEXT ANALİZ RAPORU\n\n';
    report += `🎯 Seçilen Kural Seti: ${result.selectedRuleSet}\n`;
    report += `📦 Yüklenen Componentler: ${result.loadedComponents.join(', ')}\n\n`;
    
    report += '📊 Analiz Detayları:\n';
    report += `   • Proje Tipi: ${result.contextAnalysis.projectType}\n`;
    report += `   • Karmaşıklık: ${result.contextAnalysis.complexity}\n`;
    report += `   • Kullanıcı Niyeti: ${result.contextAnalysis.userIntent}\n`;
    report += `   • Dosya Sayısı: ${result.contextAnalysis.fileCount}\n`;
    report += `   • Dosya Boyutu Durumu: ${result.contextAnalysis.fileSizeStatus}\n`;
    
    if (result.contextAnalysis.platform) {
      report += `   • Platform: ${result.contextAnalysis.platform}\n`;
    }
    
    if (result.recommendations.length > 0) {
      report += '\n💡 Öneriler:\n';
      result.recommendations.forEach((rec, i) => {
        report += `   ${i + 1}. ${rec}\n`;
      });
    }
    
    return report;
  }
  
  private static generateContextReportEnglish(result: ContextDetectionResult): string {
    let report = '🔍 CONTEXT ANALYSIS REPORT\n\n';
    report += `🎯 Selected Rule Set: ${result.selectedRuleSet}\n`;
    report += `📦 Loaded Components: ${result.loadedComponents.join(', ')}\n\n`;
    
    report += '📊 Analysis Details:\n';
    report += `   • Project Type: ${result.contextAnalysis.projectType}\n`;
    report += `   • Complexity: ${result.contextAnalysis.complexity}\n`;
    report += `   • User Intent: ${result.contextAnalysis.userIntent}\n`;
    report += `   • File Count: ${result.contextAnalysis.fileCount}\n`;
    report += `   • File Size Status: ${result.contextAnalysis.fileSizeStatus}\n`;
    
    if (result.contextAnalysis.platform) {
      report += `   • Platform: ${result.contextAnalysis.platform}\n`;
    }
    
    if (result.recommendations.length > 0) {
      report += '\n💡 Recommendations:\n';
      result.recommendations.forEach((rec, i) => {
        report += `   ${i + 1}. ${rec}\n`;
      });
    }
    
    return report;
  }
}

