/**
 * The SummaryItem is the base class to define
 * the abstract summary items
 */
class SummaryItem {
    public readonly type;
    constructor(type: String) {
      this.type = type;
    }
}

/**
 * The survey title type
 */
  export class SurveyTitle extends SummaryItem {
    public readonly title;
    constructor(title: String) {
        super('SurveyTitle');
        this.title = title;
    }
  }

  /**
   * The section title type
   */
  export class SectionTitle extends SummaryItem {
    public readonly title;
    constructor(title: String) {
        super('SectionTitle');
        this.title = title;
    }
  }

  export class SectionFooter extends SummaryItem {
    public readonly section;
    public readonly totalScore;
    constructor(section: String, totalScore: Number) {
      super('SectionFooter');
      this.section = section;
      this.totalScore = totalScore;
    }
  }

  /**
   * the Question type
   */
  export class Question extends SummaryItem {
    public readonly content;
    public readonly score;
    public readonly answer;
    constructor(content: String, score: Number, answer: String) {
        super('Question');
        this.content = content;
        this.score   = score;
        this.answer  = answer;
    }
  }
