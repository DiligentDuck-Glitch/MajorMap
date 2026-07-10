/* ============================================================
   MajorMap — PAAET Computer-Teacher (معلم الحاسب) planner
   Course identities (subject/number/name/department) are taken from
   PAAET Banner + the eadvisor الخطة الدراسية page (source of truth).
   Live section offerings come from the local backend proxy (server.py):
     GET /api/sections?term=&subj=&crse=   (boys-only)
   ============================================================ */

const TOTAL_CREDITS = 134;
// GitHub Pages is static. Keep Banner-dependent controls disabled until the
// cached sections workflow has been implemented and verified against Banner.
const OFFERINGS_ENABLED = false;

// Term codes for the "next term" selector (Banner term_in values).
const TERMS = {
  "202610": { ar: "الفصل الأول 2026-2027", en: "Fall 2026-2027" },
  "202530": { ar: "الفصل الصيفي 2025-2026", en: "Summer 2025-2026" },
  "202520": { ar: "الفصل الثاني 2025-2026", en: "Spring 2025-2026" },
  "202510": { ar: "الفصل الأول 2025-2026", en: "Fall 2025-2026" }
};

const TERM_COLUMNS = [
  { ar: "السنة الأولى - الفصل الأول", en: "Year 1 - Fall" },
  { ar: "السنة الأولى - الفصل الثاني", en: "Year 1 - Spring" },
  { ar: "السنة الثانية - الفصل الأول", en: "Year 2 - Fall" },
  { ar: "السنة الثانية - الفصل الثاني", en: "Year 2 - Spring" },
  { ar: "السنة الثالثة - الفصل الأول", en: "Year 3 - Fall" },
  { ar: "السنة الثالثة - الفصل الثاني", en: "Year 3 - Spring" },
  { ar: "السنة الرابعة - الفصل الأول", en: "Year 4 - Fall" },
  { ar: "السنة الرابعة - الفصل الثاني", en: "Year 4 - Spring" }
];

const SUMMER_COLUMN = { ar: "فصل صيفي", en: "Summer" };

const DAYS = [
  { id: "sat", ar: "السبت", en: "Sat" },
  { id: "sun", ar: "الأحد", en: "Sun" },
  { id: "mon", ar: "الإثنين", en: "Mon" },
  { id: "tue", ar: "الثلاثاء", en: "Tue" },
  { id: "wed", ar: "الأربعاء", en: "Wed" },
  { id: "thu", ar: "الخميس", en: "Thu" },
  { id: "fri", ar: "الجمعة", en: "Fri" }
];

const HOURS = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

// Department (القسم) names by Banner subject code.
// Verified against the eadvisor بيانات المقرر panel (القسم العلمي) per course.
const DEPARTMENTS = {
  "0101": { ar: "التربية الإسلامية", en: "Islamic Education" },
  "0102": { ar: "اللغة العربية", en: "Arabic Language" },
  "0103": { ar: "الدراسات الاجتماعية", en: "Social Studies" },
  "0105": { ar: "الرياضيات", en: "Mathematics" },
  "0106": { ar: "العلوم", en: "Science" },
  "0107": { ar: "التربية الفنية", en: "Art Education" },
  "0108": { ar: "التربية الرياضية", en: "Physical Education" },
  "0109": { ar: "تكنولوجيا التعليم", en: "Educational Technology" },
  "0110": { ar: "علوم المكتبات", en: "Library Science" },
  "0111": { ar: "الاقتصاد المنزلى", en: "Home Economics" },
  "0113": { ar: "التربيه الموسيقيه", en: "Music Education" },
  "0114": { ar: "علم التربية", en: "Education" },
  "0115": { ar: "علم النفس", en: "Psychology" },
  "0118": { ar: "اللغة الإنجليزية", en: "English Language" },
  "0119": { ar: "التربيه الخاصه", en: "Special Education" },
  "0124": { ar: "معلم الحاسب", en: "Computer Teacher" },
  "0130": { ar: "اللغة الإنجليزية", en: "English Language" },
  "0141": { ar: "التمريض", en: "Nursing" },
  "0165": { ar: "هندسة ميكانيكا السيارات", en: "Automotive Engineering" },
  "0179": { ar: "هندسة البترول", en: "Petroleum Engineering" }
};

// UI string dictionary (chrome only; course/department names stay Arabic).
const I18N = {
  ar: {
    mapEyebrow: "قسم الحاسوب — بكالوريوس معلم حاسوب",
    mapTitle: "خريطة التخصص",
    mapPrevious: "الفصول السابقة",
    mapNext: "الفصول التالية",
    nextTerm: "الفصل القادم",
    summer: "فصل صيفي",
    navMap: "الخريطة",
    navSchedule: "الجدول الأسبوعي",
    openBanner: "فتح بانر",
    creditUnit: "وحدة",
    transcriptEyebrow: "قراءة السجل الأكاديمي",
    transcriptTitle: "المقررات المجتازة",
    docModeLabel: "اختر نوع الصورة قبل الرفع",
    docPlan: "الخطة الدراسية",
    docTranscript: "السجل الدراسي",
    uploadPrompt: "ارفع صورة الوثيقة",
    uploadHint: "من نظام المرشد الإلكتروني (بالحجم الكامل)",
    scanBtn: "قراءة الصورة",
    sampleBtn: "تجربة عينة",
    resetBtn: "مسح",
    noUpload: "لم يتم رفع الخطة الدراسية بعد.",
    creditsPassed: "وحدة مجتازة",
    legendTitle: "دليل الألوان",
    legendComplete: "مجتاز",
    legendAvailable: "متاح (استوفى المتطلب)",
    legendLocked: "مقفل (متطلب ناقص)",
    legendPlanned: "مخطط في الجدول",
    legendElective: "مقرر اختياري",
    recordTitle: "سجل المقررات",
    recordEmpty: "ستظهر المقررات المجتازة هنا بعد قراءة الخطة.",
    scheduleEyebrow: "الفصل القادم",
    scheduleTitle: "الجدول الأسبوعي",
    scheduleSwipe: "اسحب أفقيًا لعرض بقية أيام الأسبوع.",
    noSections: "لم تتم إضافة شعب بعد.",
    sectionsSummary: (n, c) => `${n} شعب، ${c} وحدات مخططة`,
    detailEyebrow: "الشعب والتفاصيل",
    detailTitle: "تفاصيل المقرر",
    close: "إغلاق",
    chooseElective: "اختر المقرر الاختياري",
    prereq: "المتطلب السابق",
    coreq: "المتطلب المتزامن",
    opens: "يفتح المقررات",
    none: "لا يوجد",
    noDirectOpen: "لا يوجد مقرر مباشر",
    department: "القسم العلمي",
    markComplete: "تحديد كمجتاز",
    unmarkComplete: "إلغاء الاجتياز",
    refreshBanner: "تحديث الشعب من بانر",
    loadingSections: "جاري تحميل الشعب من بانر...",
    noOfferings: "لا توجد شعب بنين متاحة لهذا المقرر في هذا الفصل.",
    bannerError: "تعذر الاتصال ببانر. تأكد من تشغيل الخادم (python server.py).",
    section: "شعبة",
    crn: "الرقم المرجعي",
    time: "الوقت",
    days: "الأيام",
    professor: "المدرس",
    place: "المكان",
    type: "النوع",
    add: "إضافة إلى الجدول",
    remove: "حذف",
    tabComplete: "مجتاز",
    tabPlanned: "مخطط",
    tabAvailable: "متاح للتخطيط",
    tabLocked: "مقفل",
    tabElective: "اختياري",
    statsTitle: "نتيجة قراءة الخطة",
    statsRead: "مقررات تمت قراءتها",
    statsExpected: "إجمالي مقررات الخطة",
    statsPassed: "مقررات مجتازة",
    statsUnread: "تعذّر قراءة",
    unit3: "و.",
    langBtn: "EN",
    themeDark: "الوضع الليلي",
    themeLight: "الوضع النهاري",
    time_word: "الوقت",
    addSummer: "إضافة فصل صيفي هنا",
    addTerm: "إضافة فصل دراسي",
    creditWarn18: "تنبيه: تجاوز حد 18 وحدة مسموح لطلبة التخرج فقط",
    creditWarn9: "تنبيه: تجاوز حد 9 وحدات صيفية مسموح لطلبة التخرج فقط",
    invalidPlacement: "يجب أن يسبق المتطلب المقرر التابع له. لم يتم نقل المقرر.",
    pastNoTerm: "مقررات مجتازة",
    removeTerm: "حذف الفصل",
    fallWord: "الفصل الأول",
    springWord: "الفصل الثاني",
    summerWord: "الفصل الصيفي",
    yearWord: "السنة"
  },
  en: {
    mapEyebrow: "Computer Dept. — B.Ed. Computer Teacher",
    mapTitle: "Degree Flowchart",
    mapPrevious: "Previous semesters",
    mapNext: "Next semesters",
    nextTerm: "Next term",
    summer: "Summer term",
    navMap: "Flowchart",
    navSchedule: "Weekly schedule",
    openBanner: "Banner unavailable",
    creditUnit: "cr",
    transcriptEyebrow: "Read academic record",
    transcriptTitle: "Completed courses",
    docModeLabel: "Choose the document type before uploading",
    docPlan: "Study plan (Major Sheet)",
    docTranscript: "Transcript (grades)",
    uploadPrompt: "Upload your document image",
    uploadHint: "From the e.advisor system (full size)",
    scanBtn: "Scan image",
    sampleBtn: "Try sample",
    resetBtn: "Clear",
    noUpload: "No study plan uploaded yet.",
    creditsPassed: "credits passed",
    legendTitle: "Color legend",
    legendComplete: "Completed",
    legendAvailable: "Available (prereqs met)",
    legendLocked: "Locked (missing prereq)",
    legendPlanned: "Planned in schedule",
    legendElective: "Elective course",
    recordTitle: "Course record",
    recordEmpty: "Completed courses will appear here after scanning.",
    scheduleEyebrow: "Next term",
    scheduleTitle: "Weekly schedule",
    scheduleSwipe: "Swipe sideways to view the full week.",
    noSections: "No sections added yet.",
    sectionsSummary: (n, c) => `${n} sections, ${c} planned credits`,
    detailEyebrow: "Sections & details",
    detailTitle: "Course details",
    close: "Close",
    chooseElective: "Choose the elective course",
    prereq: "Prerequisite",
    coreq: "Co-requisite",
    opens: "Unlocks",
    none: "None",
    noDirectOpen: "No direct course",
    department: "Department",
    markComplete: "Mark completed",
    unmarkComplete: "Unmark",
    refreshBanner: "Refresh sections from Banner",
    loadingSections: "Loading sections from Banner...",
    noOfferings: "No boys sections available for this course this term.",
    bannerError: "Could not reach Banner. Make sure the server is running (python server.py).",
    section: "Section",
    crn: "CRN",
    time: "Time",
    days: "Days",
    professor: "Instructor",
    place: "Room",
    type: "Type",
    add: "Add to schedule",
    remove: "Remove",
    tabComplete: "Completed",
    tabPlanned: "Planned",
    tabAvailable: "Available",
    tabLocked: "Locked",
    tabElective: "Elective",
    statsTitle: "Study-plan scan result",
    statsRead: "Courses read",
    statsExpected: "Total plan courses",
    statsPassed: "Courses passed",
    statsUnread: "Could not read",
    unit3: "cr",
    langBtn: "ع",
    themeDark: "Dark mode",
    themeLight: "Light mode",
    time_word: "Time",
    addSummer: "Add a summer term here",
    addTerm: "Add a semester",
    creditWarn18: "Only graduating students may exceed the 18-credit limit",
    creditWarn9: "Only graduating students may exceed the 9-credit summer limit",
    invalidPlacement: "A prerequisite must come before its dependent course. The course was not moved.",
    pastNoTerm: "Completed courses",
    removeTerm: "Remove term",
    fallWord: "Fall",
    springWord: "Spring",
    summerWord: "Summer",
    yearWord: "Year",
    semesterEligibility: "Show courses available in this semester",
    courseEligible: "Available in this semester",
    courseIneligible: "Prerequisites are not yet complete",
    offeringsUnavailable: "Course sections are temporarily unavailable.",
    reviewScan: "Review detected courses",
    reviewScanHint: "Confirm the courses before applying them to your plan.",
    applyScan: "Apply selected courses",
    cancelScan: "Cancel scan",
    detectedCourses: "courses detected",
    scanReady: "Review the detected courses before applying them."
  }
};

// Kept as escapes so the source remains safe in editors configured with a
// legacy Windows code page.
Object.assign(I18N.ar, {
  openBanner: "\u0628\u064a\u0627\u0646\u0627\u062a \u0628\u0627\u0646\u0631 \u063a\u064a\u0631 \u0645\u062a\u0627\u062d\u0629",
  semesterEligibility: "\u0625\u0638\u0647\u0627\u0631 \u0627\u0644\u0645\u0642\u0631\u0631\u0627\u062a \u0627\u0644\u0645\u062a\u0627\u062d\u0629 \u0641\u064a \u0647\u0630\u0627 \u0627\u0644\u0641\u0635\u0644",
  courseEligible: "\u0645\u062a\u0627\u062d \u0641\u064a \u0647\u0630\u0627 \u0627\u0644\u0641\u0635\u0644",
  courseIneligible: "\u0627\u0644\u0645\u062a\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0633\u0627\u0628\u0642\u0629 \u063a\u064a\u0631 \u0645\u0643\u062a\u0645\u0644\u0629",
  offeringsUnavailable: "\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0634\u0639\u0628 \u063a\u064a\u0631 \u0645\u062a\u0627\u062d\u0629 \u0645\u0624\u0642\u062a\u064b\u0627.",
  reviewScan: "\u0631\u0627\u062c\u0639 \u0627\u0644\u0645\u0642\u0631\u0631\u0627\u062a \u0627\u0644\u0645\u0643\u062a\u0634\u0641\u0629",
  reviewScanHint: "\u0623\u0643\u062f \u0627\u0644\u0645\u0642\u0631\u0631\u0627\u062a \u0642\u0628\u0644 \u062a\u0637\u0628\u064a\u0642\u0647\u0627 \u0639\u0644\u0649 \u062e\u0637\u062a\u0643.",
  applyScan: "\u062a\u0637\u0628\u064a\u0642 \u0627\u0644\u0645\u0642\u0631\u0631\u0627\u062a \u0627\u0644\u0645\u062d\u062f\u062f\u0629",
  cancelScan: "\u0625\u0644\u063a\u0627\u0621 \u0627\u0644\u0645\u0633\u062d",
  detectedCourses: "\u0645\u0642\u0631\u0631\u0627\u062a \u0645\u0643\u062a\u0634\u0641\u0629",
  scanReady: "\u0631\u0627\u062c\u0639 \u0627\u0644\u0645\u0642\u0631\u0631\u0627\u062a \u0627\u0644\u0645\u0643\u062a\u0634\u0641\u0629 \u0642\u0628\u0644 \u062a\u0637\u0628\u064a\u0642\u0647\u0627."
});

// ---- Elective options (each carries its real Banner subject+number) ----
const ELECTIVE_OPTIONS = {
  // Verified against the eadvisor MajorSheet video (2026-07-08): dept/number
  // per table row, dept name per بيانات المقرر panel.
  "EL-GEN-1": [
    electiveOption("0101", "120", "اعجاز علمى فى القران والسنه"),
    electiveOption("0103", "115", "الكويت والتنميه"),
    electiveOption("0103", "119", "قضايا معاصره"),
    electiveOption("0106", "122", "الثقافه الصحيه"),
    electiveOption("0106", "199", "نشاط زراعى"),
    electiveOption("0107", "105", "الفن والحياه"),
    electiveOption("0108", "197", "اللياقه البدنيه والرياضه"),
    electiveOption("0109", "199", "التصويرالضوئى والا ضاءه"),
    electiveOption("0110", "103", "المكتبه واستخداماتها"),
    electiveOption("0111", "199", "اقتصاد منزلى"),
    electiveOption("0113", "154", "الثقافه الموسيقيه"),
    electiveOption("0114", "105", "م تربوى فى العلاقه بين الجنسين"),
    electiveOption("0115", "161", "علم النفس الا سرى"),
    electiveOption("0118", "101", "اللغة الإسبانية"),
    electiveOption("0119", "153", "مدخل في التربية الخاصة"),
    electiveOption("0130", "107", "اللغة الفرنسية عام (1)"),
    electiveOption("0141", "104", "الا سعافات الا وليه"),
    electiveOption("0165", "199", "ميكانيكا سيارات"),
    electiveOption("0179", "101", "ثقافة نفطية")
  ],
  "EL-GEN-2": [],
  "EL-PRO-1": [
    electiveOption("0114", "107", "مهارات دراسيه"),
    electiveOption("0114", "205", "م تربوى فى العلاقه بين الجنسين"),
    electiveOption("0114", "265", "التربيه المقارنه"),
    electiveOption("0114", "366", "التعليم عن بعد"),
    electiveOption("0114", "435", "التعليم المستمر"),
    electiveOption("0114", "465", "تخطيط تربوى واقتصاديات التعليم"),
    electiveOption("0115", "159", "علم نفس النمو"),
    electiveOption("0115", "251", "مبادىء الصحه النفسيه")
  ],
  "EL-MAJ-1": [
    electiveOption("0124", "320", "الدوائرالمنطقيه"),
    electiveOption("0124", "353", "تطبيقات الرسوم"),
    electiveOption("0124", "402", "هياكل البيانات (متقدم)"),
    electiveOption("0105", "339", "البرمجه الخطيه"),
    electiveOption("0105", "367", "المعادلات التفاضليه")
  ],
  "EL-MAJ-2": []
};
ELECTIVE_OPTIONS["EL-GEN-2"] = ELECTIVE_OPTIONS["EL-GEN-1"];
ELECTIVE_OPTIONS["EL-MAJ-2"] = ELECTIVE_OPTIONS["EL-MAJ-1"];

// ---- Required-course catalog (term index 0..7) ----
// c(subject4, number, title, credits, term, group, prereqs, coreqs)
const COURSES = [
  // Year 1 - Fall (term 0)
  c("0124", "103", "مقدمه فى الحاسوب", 3, 0, "تخصص"),
  c("0102", "101", "تدريبات لغويه", 3, 0, "ثقافة عامة"),
  c("0101", "102", "الثقافة الاسلامية", 3, 0, "ثقافة عامة"),
  c("0105", "211", "حساب التفاضل والتكامل(1)", 3, 0, "تخصص"),
  c("0114", "101", "اصول التربيه", 3, 0, "إعداد مهني"),

  // Year 1 - Spring (term 1)
  c("0124", "153", "برمجه الحاسوب (1)", 3, 1, "تخصص"),
  c("0124", "158", "تطبيقات الحاسوب", 3, 1, "تخصص", ["0124-103"]),
  c("0106", "102", "الثقافة العلمية", 3, 1, "ثقافة عامة"),
  c("0130", "181", "لغه انجليزيه (2)", 3, 1, "ثقافة عامة"),
  c("0109", "113", "مقدمه فى تكنولوجيا التعليم", 3, 1, "إعداد مهني"),
  c("0115", "109", "علم النفس التربوى", 3, 1, "إعداد مهني"),

  // Year 2 - Fall (term 2)
  c("0124", "206", "برمجه الحاسوب (2)", 3, 2, "تخصص", ["0124-153"]),
  c("0124", "201", "مهارات المعلومات", 3, 2, "تخصص", ["0124-158"]),
  c("0105", "253", "الجبر الخطى", 3, 2, "تخصص"),
  c("0103", "112", "قيم العمل والولاء", 3, 2, "ثقافة عامة"),
  c("0114", "284", "المناهج", 3, 2, "إعداد مهني"),
  e("EL-GEN-1", "اختياري ثقافة عامة (1)", 3, 2, "ثقافة عامة"),

  // Year 2 - Spring (term 3)
  c("0124", "302", "الخوارزميات وهياكل البيانات", 3, 3, "تخصص", ["0124-206", "0105-253"]),
  c("0124", "351", "صيانه الحاسوب", 3, 3, "تخصص", ["0124-253"]),
  c("0105", "304", "مبادىء فى الا حصاء والا حتمال", 3, 3, "تخصص"),
  c("0115", "209", "التعلم ونظرياته", 3, 3, "إعداد مهني", ["0115-109"]),
  c("0103", "105", "الحضارة العربية الاسلامية", 3, 3, "ثقافة عامة"),
  e("EL-GEN-2", "اختياري ثقافة عامة (2)", 3, 3, "ثقافة عامة"),

  // Year 3 - Fall (term 4)
  c("0124", "258", "نظم قواعد البيانات", 3, 4, "تخصص", ["0124-206"]),
  c("0124", "253", "نظم تشغيل الحاسوب", 3, 4, "تخصص", ["0124-153"]),
  c("0124", "451", "اداره وتشغيل شبكات الحاسوب", 3, 4, "تخصص", ["0124-351"]),
  c("0109", "268", "الوسائط التعليميه المتعدده", 3, 4, "تخصص", ["0124-158"]),
  c("0114", "261", "طرق تدريس حاسوب (1)", 3, 4, "إعداد مهني"),
  e("EL-PRO-1", "اختياري إعداد مهني", 3, 4, "إعداد مهني"),

  // Year 3 - Spring (term 5)
  c("0124", "352", "برمجه الحاسوب (3)", 3, 5, "تخصص", ["0124-206"]),
  c("0124", "301", "البرمجه المبنيه على الانترنت", 3, 5, "تخصص", ["0124-258"]),
  c("0109", "244", "تصميم الدروس باستخدام الحاسوب", 3, 5, "تخصص", ["0124-103"]),
  c("0109", "345", "تصميم البرامج التعليميه", 3, 5, "تخصص", ["0109-268"]),
  c("0114", "361", "طرق تدريس حاسوب (2)", 3, 5, "إعداد مهني", ["0114-261"]),
  e("EL-MAJ-1", "اختياري تخصصي (1)", 3, 5, "تخصص"),

  // Year 4 - Fall (term 6)
  c("0124", "401", "المدخل الى الذكاء الاصطناعى", 3, 6, "تخصص", ["0124-302"]),
  c("0124", "304", "تحليل النظم", 3, 6, "تخصص", ["0124-258"]),
  c("0124", "403", "الحاسوب والمجتمع", 3, 6, "تخصص", ["0124-301", "0124-302"]),
  c("0105", "457", "التحليل العددى", 3, 6, "تخصص", ["0105-253"]),
  c("0114", "384", "مناهج البحث", 3, 6, "إعداد مهني"),
  e("EL-MAJ-2", "اختياري تخصصي (2)", 3, 6, "تخصص"),

  // Year 4 - Spring (term 7)
  c("0114", "488", "حلقه بحث حاسوب", 2, 7, "إعداد مهني", [], ["0114-492"]),
  c("0114", "492", "تربيه عمليه", 9, 7, "إعداد مهني", [], ["0114-488"])
];

// The student's real transcript (from the uploaded الخطة/السجل) — used by "sample".
const KNOWN_TRANSCRIPT_RECORDS = [
  tr("0102-101", "الفصل الأول 2023-2024", "B+"),
  tr("0114-101", "الفصل الأول 2023-2024", "C+"),
  tr("0124-103", "الفصل الأول 2023-2024", "A-"),
  trElec("EL-GEN-1", "الفصل الثاني 2023-2024", "B-", "الكويت والتنميه"),
  tr("0114-261", "الفصل الثاني 2023-2024", "A-"),
  tr("0114-384", "الفصل الثاني 2023-2024", "C+"),
  tr("0124-153", "الفصل الثاني 2023-2024", "A"),
  tr("0114-361", "الفصل الأول 2024-2025", "A"),
  tr("0124-206", "الفصل الأول 2024-2025", "A-"),
  tr("0124-253", "الفصل الأول 2024-2025", "C+"),
  trElec("EL-MAJ-1", "الفصل الأول 2024-2025", "B+", "الدوائرالمنطقيه"),
  trElec("EL-GEN-2", "الفصل الثاني 2024-2025", "A-", "م تربوى فى العلاقه بين الجنسين"),
  tr("0124-158", "الفصل الثاني 2024-2025", "A"),
  tr("0124-351", "الفصل الثاني 2024-2025", "A"),
  tr("0109-113", "الفصل الأول 2025-2026", "A"),
  tr("0109-244", "الفصل الأول 2025-2026", "A"),
  trElec("EL-PRO-1", "الفصل الأول 2025-2026", "A", "التربيه المقارنه"),
  tr("0124-201", "الفصل الأول 2025-2026", "A"),
  tr("0130-181", "الفصل الأول 2025-2026", "A"),
  tr("0101-102", "الفصل الثاني 2025-2026", "A-"),
  tr("0105-253", "الفصل الثاني 2025-2026", "A"),
  tr("0106-102", "الفصل الثاني 2025-2026", "B+"),
  tr("0109-268", "الفصل الثاني 2025-2026", "B+"),
  tr("0124-258", "الفصل الثاني 2025-2026", "C+")
];

const state = {
  completed: new Set(),
  completedMeta: {},
  electiveSelections: {},
  // Dynamic plan: null futureSems = canonical 8-term layout. Once the user
  // adds terms / drags cards / uploads a transcript, futureSems holds the
  // ordered future semesters and placements pins courses to them.
  futureSems: null,          // [{ id: "f1", kind: "regular"|"summer" }]
  placements: {},            // courseId -> futureSem id (user-pinned)
  selectedCourseId: null,
  eligibilitySemesterId: null,
  pendingScan: null,
  sections: [],
  bannerMessage: "",
  scanStats: null,
  scanMode: "plan",
  lang: "ar",
  theme: "light"
};
let semIdCounter = 0;
const newSemId = () => `f${++semIdCounter}`;

const courseById = new Map(COURSES.map((course) => [course.id, course]));
const offeringsCache = {};   // key `${term}:${subj}:${crse}` -> array
const elements = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  restoreState();
  bindEvents();
  applyLanguage();
  applyTheme();
  applyScanMode();
  renderAll();
  window.addEventListener("resize", debounce(drawArrows, 120));
});

// ---------- factories ----------
function c(subj, num, title, credits, term, group, prereqs = [], coreqs = []) {
  const id = `${subj}-${num}`;
  return {
    id, subj, num, title, credits, term, group,
    prereqs, coreqs,
    dept: (DEPARTMENTS[subj] || { ar: "", en: "" }),
    aliases: buildAliases(title)
  };
}

function e(id, title, credits, term, group) {
  return {
    id, subj: "", num: "", title, credits, term, group,
    prereqs: [], coreqs: [], elective: true, dept: null,
    aliases: [title]
  };
}

function electiveOption(subj, num, title) {
  return { id: `${subj}-${num}`, subj, num, title, credits: 3, dept: DEPARTMENTS[subj] || null };
}

function tr(courseId, term, grade) {
  return { courseId, term, grade };
}

function trElec(slotId, term, grade, chosenTitle) {
  const option = (ELECTIVE_OPTIONS[slotId] || []).find((o) => o.title === chosenTitle);
  return { courseId: slotId, term, grade, electiveChoiceId: option ? option.id : "" };
}

function buildAliases(title) {
  return [...new Set([title, title.replace(/ة/g, "ه").replace(/[أإآ]/g, "ا").replace(/ى/g, "ي")])];
}

// ---------- element cache ----------
function cacheElements() {
  const q = (s) => document.querySelector(s);
  elements.flowchart = q("#flowchart");
  elements.arrows = q("#flow-arrows");
  elements.plannerNotice = q("#planner-notice");
  elements.courseDetail = q("#course-detail");
  elements.fileInput = q("#transcript-file");
  elements.preview = q("#transcript-preview");
  elements.scanButton = q("#scan-button");
  elements.sampleButton = q("#sample-button");
  elements.resetButton = q("#reset-button");
  elements.scanStatus = q("#scan-status");
  elements.scanStats = q("#scan-stats");
  elements.scanReview = q("#scan-review");
  elements.progressLabel = q("#progress-label");
  elements.progressBar = q("#progress-bar");
  elements.progressRing = q("#progress-ring");
  elements.headerProgressText = q("#header-progress-text");
  elements.completedList = q("#completed-list");
  elements.calendar = q("#calendar-grid");
  elements.selectedSections = q("#selected-sections");
  elements.scheduleSummary = q("#schedule-summary");
  elements.termSelect = q("#term-select");
  elements.drawer = q("#detail-drawer");
  elements.drawerScrim = q("#drawer-scrim");
  elements.drawerClose = q("#drawer-close");
  elements.langToggle = q("#lang-toggle");
  elements.themeToggle = q("#theme-toggle");
  elements.docChoice = q("#doc-choice");
  elements.mapScrollPrev = q("#map-scroll-prev");
  elements.mapScrollNext = q("#map-scroll-next");
}

function applyScanMode() {
  if (!elements.docChoice) return;
  elements.docChoice.querySelectorAll(".doc-opt").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.mode === state.scanMode);
  });
}

function t(key, ...args) {
  const val = (I18N[state.lang] || I18N.ar)[key];
  return typeof val === "function" ? val(...args) : (val ?? key);
}

function deptName(course) {
  if (!course || !course.dept) return "";
  return course.dept[state.lang] || course.dept.ar;
}

// ---------- events ----------
function bindEvents() {
  elements.fileInput.addEventListener("change", handleFileUpload);
  elements.scanButton.addEventListener("click", scanPlanImage);
  elements.sampleButton.addEventListener("click", () =>
    applyTranscriptRecords(KNOWN_TRANSCRIPT_RECORDS, null));
  elements.resetButton.addEventListener("click", resetPlanner);
  elements.termSelect.addEventListener("change", () => {
    Object.keys(offeringsCache).forEach((k) => delete offeringsCache[k]);
    renderDetail();
  });
  elements.drawerClose.addEventListener("click", closeDetailDrawer);
  elements.drawerScrim.addEventListener("click", closeDetailDrawer);
  elements.langToggle.addEventListener("click", toggleLanguage);
  elements.themeToggle.addEventListener("click", toggleTheme);
  elements.mapScrollPrev?.addEventListener("click", () => scrollDegreeMap(-524));
  elements.mapScrollNext?.addEventListener("click", () => scrollDegreeMap(524));
  elements.docChoice.querySelectorAll(".doc-opt").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.scanMode = btn.dataset.mode;
      clearScanReview();
      applyScanMode();
      saveState();
    });
  });
  document.addEventListener("keydown", (ev) => { if (ev.key === "Escape") closeDetailDrawer(); });
}

function scrollDegreeMap(amount) {
  const wrap = document.querySelector(".flowchart-wrap");
  if (!wrap) return;
  wrap.scrollBy({ left: amount, behavior: "smooth" });
}

// ---------- language & theme ----------
function toggleLanguage() {
  state.lang = state.lang === "ar" ? "en" : "ar";
  saveState();
  applyLanguage();
  renderAll();
}

function applyLanguage() {
  const isAr = state.lang === "ar";
  document.documentElement.lang = isAr ? "ar" : "en";
  document.documentElement.dir = isAr ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  if (elements.langToggle) elements.langToggle.textContent = t("langBtn");
  updateThemeToggleLabel();
  // term selector labels
  [...elements.termSelect.options].forEach((opt) => {
    const term = TERMS[opt.value];
    if (term) opt.textContent = term[state.lang];
  });
}

function toggleTheme() {
  state.theme = state.theme === "dark" ? "light" : "dark";
  saveState();
  applyTheme();
  requestAnimationFrame(drawArrows);
}

function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
  updateThemeToggleLabel();
}

function updateThemeToggleLabel() {
  if (!elements.themeToggle) return;
  const dark = state.theme === "dark";
  elements.themeToggle.setAttribute("aria-label", dark ? t("themeLight") : t("themeDark"));
  elements.themeToggle.title = dark ? t("themeLight") : t("themeDark");
}

// ---------- state persistence ----------
function restoreState() {
  try {
    const saved = JSON.parse(localStorage.getItem("majorMapPlanner2") || "{}");
    if (Array.isArray(saved.completed)) state.completed = new Set(saved.completed.filter((id) => courseById.has(id)));
    if (saved.completedMeta) state.completedMeta = saved.completedMeta;
    if (saved.electiveSelections) state.electiveSelections = saved.electiveSelections;
    if (Array.isArray(saved.futureSems)) {
      state.futureSems = saved.futureSems.filter((s2) => s2 && s2.id && (s2.kind === "regular" || s2.kind === "summer"));
      semIdCounter = state.futureSems.reduce((m, s2) => Math.max(m, Number(String(s2.id).slice(1)) || 0), 0);
    }
    if (saved.placements) state.placements = saved.placements;
    if (Array.isArray(saved.sections)) state.sections = saved.sections;
    if (saved.lang === "en" || saved.lang === "ar") state.lang = saved.lang;
    if (saved.theme === "dark" || saved.theme === "light") state.theme = saved.theme;
    if (saved.scanStats) state.scanStats = saved.scanStats;
    if (saved.scanMode === "plan" || saved.scanMode === "transcript") state.scanMode = saved.scanMode;
    if (sanitizePinnedPlacements()) saveState();
  } catch { /* ignore */ }
}

function saveState() {
  localStorage.setItem("majorMapPlanner2", JSON.stringify({
    completed: [...state.completed],
    completedMeta: state.completedMeta,
    electiveSelections: state.electiveSelections,
    futureSems: state.futureSems,
    placements: state.placements,
    sections: state.sections,
    lang: state.lang,
    theme: state.theme,
    scanStats: state.scanStats,
    scanMode: state.scanMode
  }));
}

function resetPlanner() {
  scanRun++; // invalidate any OCR scan still in flight so it can't repopulate state
  state.completed = new Set();
  state.completedMeta = {};
  state.electiveSelections = {};
  state.sections = [];
  state.bannerMessage = "";
  state.futureSems = null;
  state.placements = {};
  state.selectedCourseId = null;
  state.eligibilitySemesterId = null;
  clearScanReview();
  state.scanStats = null;
  if (elements.fileInput) elements.fileInput.value = "";
  if (elements.preview) { elements.preview.hidden = true; elements.preview.removeAttribute("src"); }
  if (elements.scanButton) elements.scanButton.disabled = false;
  elements.scanStatus.textContent = t("noUpload");
  saveState();
  renderAll();
}

// ---------- drawer (non-modal: the page stays clickable behind it) ----------
function openDetailDrawer() {
  elements.drawer.classList.add("is-open");
  elements.drawer.setAttribute("aria-hidden", "false");
}
function closeDetailDrawer() {
  elements.drawer.classList.remove("is-open");
  elements.drawer.setAttribute("aria-hidden", "true");
  state.selectedCourseId = null;
  renderFlowchart();
  requestAnimationFrame(drawArrows);
}

// ---------- render ----------
function renderAll() {
  renderFlowchart();
  renderDetail();
  renderProgress();
  renderSchedule();
  renderScanStats();
  requestAnimationFrame(drawArrows);
}

function showPlannerNotice(message = "") {
  state.plannerNotice = message;
  if (elements.plannerNotice) elements.plannerNotice.textContent = message;
}

function isUnlocked(course) {
  return (course.prereqs || []).every((id) => state.completed.has(id));
}

// Snapshot eligibility at the start of a future semester. Courses in earlier
// columns are treated as completed for this preview; the selected semester
// itself can never satisfy a prerequisite.
function eligibilityForSemester(course, layout, semesterId) {
  if (!semesterId) return null;
  const semesterIndex = layout.columns.findIndex((column) =>
    column.future && column.id === semesterId);
  if (semesterIndex < 0) return null;

  const completedBefore = new Set(state.completed);
  layout.columns.slice(0, semesterIndex).forEach((column) => {
    column.courses.forEach((item) => completedBefore.add(item.id));
  });
  const missing = (course.prereqs || []).filter((id) => !completedBefore.has(id));
  return { eligible: missing.length === 0, missing };
}

/* ============ Semester engine ============
   Columns = past terms (from the transcript) + future terms.
   Future terms are either the canonical 8-term plan (default) or a dynamic
   list the user grows with + buttons; unpinned courses are auto-scheduled
   at 15 cr/regular and 6 cr/summer, honoring prerequisite order. */

const AUTO_CAP = { regular: 15, summer: 6 };
const WARN_CAP = { regular: 18, summer: 9 };

// "الفصل الأول 2023-2024" -> { season, y } ; season: 0=fall,1=spring,2=summer
function parseTermName(str) {
  const s = String(str || "");
  const years = s.match(/(20\d{2})\s*-\s*(20\d{2})/);
  const season = /صيفي|صيف/.test(s) ? 2 : /الثاني/.test(s) ? 1 : /الأول|الاول/.test(s) ? 0 : -1;
  if (season < 0 || !years) return null;
  const y = Math.min(Number(years[1]), Number(years[2]));
  return { season, y };
}

function termLabelOf(season, y) {
  const word = season === 0 ? t("fallWord") : season === 1 ? t("springWord") : t("summerWord");
  return y ? `${word} ${y}-${y + 1}` : word;
}

// Advance one regular semester: fall,y -> spring,y ; spring,y -> fall,y+1
function nextRegular(cur) {
  return cur.season === 0 ? { season: 1, y: cur.y } : { season: 0, y: cur.y + 1 };
}

// Topological-ish ordering for auto placement: prereq depth first,
// canonical term as tiebreak so the result resembles the official plan.
function autoOrder(remaining) {
  const remIds = new Set(remaining.map((c2) => c2.id));
  const depthMemo = {};
  const depthOf = (id, seen = new Set()) => {
    if (depthMemo[id] !== undefined) return depthMemo[id];
    if (seen.has(id)) return 0;
    seen.add(id);
    const course = courseById.get(id);
    const ds = (course.prereqs || []).filter((p) => remIds.has(p)).map((p) => depthOf(p, seen));
    return (depthMemo[id] = ds.length ? Math.max(...ds) + 1 : 0);
  };
  return [...remaining].sort((a, b) =>
    depthOf(a.id) - depthOf(b.id) || a.term - b.term || a.id.localeCompare(b.id));
}

// Return the earliest semester a course can occupy with the current pins.
// Completed courses are intentionally before every future semester (-1).
function earliestPinnedSemester(id, semIndexOf, pins, memo = {}, visiting = new Set()) {
  if (state.completed.has(id)) return -1;
  if (memo[id] !== undefined) return memo[id];
  if (visiting.has(id)) return Infinity; // a malformed prerequisite cycle
  if (pins[id] && semIndexOf[pins[id]] !== undefined) return (memo[id] = semIndexOf[pins[id]]);
  const course = courseById.get(id);
  if (!course) return Infinity;
  const nextVisiting = new Set(visiting);
  nextVisiting.add(id);
  const prereqEnds = (course.prereqs || []).map((p) =>
    earliestPinnedSemester(p, semIndexOf, pins, memo, nextVisiting));
  return (memo[id] = prereqEnds.length ? Math.max(...prereqEnds) + 1 : 0);
}

// Remove stale/manual pins that would make a prerequisite point backward.
// This is also run on restored state, so an old saved layout self-repairs.
function sanitizePinnedPlacements() {
  if (!state.futureSems) return false;
  const semIndexOf = Object.fromEntries(state.futureSems.map((s2, i) => [s2.id, i]));
  const pins = state.placements;
  let changed = false;
  Object.keys(pins).forEach((id) => {
    if (!courseById.has(id) || state.completed.has(id) || semIndexOf[pins[id]] === undefined) {
      delete pins[id]; changed = true;
    }
  });
  let repaired = true;
  while (repaired) {
    repaired = false;
    const memo = {};
    for (const [id, semId] of Object.entries(pins)) {
      const course = courseById.get(id);
      const targetIndex = semIndexOf[semId];
      const invalid = (course.prereqs || []).some((p) =>
        earliestPinnedSemester(p, semIndexOf, pins, memo) >= targetIndex);
      if (invalid) {
        delete pins[id];
        changed = repaired = true;
      }
    }
  }
  return changed;
}

// True only when placing this course keeps every direct prerequisite before it
// and every already pinned dependent after it. `freezeCurrentLayout()` pins all
// cards before drag/drop, so this is a complete check of the rendered plan.
function placementIsValid(courseId, semId) {
  if (!state.futureSems || !courseById.has(courseId)) return false;
  const semIndexOf = Object.fromEntries(state.futureSems.map((s2, i) => [s2.id, i]));
  const destination = semIndexOf[semId];
  if (destination === undefined) return false;
  const proposed = { ...state.placements, [courseId]: semId };
  const memo = {};
  const course = courseById.get(courseId);
  if ((course.prereqs || []).some((p) =>
    earliestPinnedSemester(p, semIndexOf, proposed, memo) >= destination)) return false;
  return !COURSES.some((dependent) =>
    !state.completed.has(dependent.id) && (dependent.prereqs || []).includes(courseId) &&
    proposed[dependent.id] && semIndexOf[proposed[dependent.id]] <= destination);
}

// Compact auto-scheduled courses toward the prerequisites and dependents they
// connect to. Manual pins remain absolute; co-requisite groups move together.
function compactSemesterPlacements(bySem, credits, pinned, placedSem, sems, remaining) {
  const remainingById = new Map(remaining.map((c2) => [c2.id, c2]));
  const groupById = new Map();
  const seen = new Set();
  for (const course of remaining) {
    if (seen.has(course.id)) continue;
    const ids = new Set([course.id]);
    const todo = [course.id];
    while (todo.length) {
      const id = todo.pop();
      const item = courseById.get(id);
      for (const candidate of remaining) {
        const linked = (item?.coreqs || []).includes(candidate.id) ||
          (candidate.coreqs || []).includes(id);
        if (linked && !ids.has(candidate.id)) { ids.add(candidate.id); todo.push(candidate.id); }
      }
    }
    const group = [...ids].map((id) => remainingById.get(id)).filter(Boolean);
    group.forEach((item) => { seen.add(item.id); groupById.set(item.id, group); });
  }

  const groupCost = (group, semesterIndex) => {
    const ids = new Set(group.map((item) => item.id));
    let cost = 0;
    for (const course of group) {
      for (const prereq of course.prereqs || []) {
        if (ids.has(prereq)) continue;
        cost += state.completed.has(prereq) ? semesterIndex + 1 :
          Math.abs(semesterIndex - (placedSem[prereq] ?? semesterIndex));
      }
      for (const dependent of remaining) {
        if (ids.has(dependent.id) || !(dependent.prereqs || []).includes(course.id)) continue;
        cost += Math.abs((placedSem[dependent.id] ?? semesterIndex) - semesterIndex);
      }
    }
    return cost;
  };
  const canMoveGroup = (group, from, to) => {
    if (to >= from || group.some((item) => pinned.has(item.id) || placedSem[item.id] !== from)) return false;
    const ids = new Set(group.map((item) => item.id));
    const groupCredits = group.reduce((sum, item) => sum + item.credits, 0);
    if (credits[sems[to].id] + groupCredits > AUTO_CAP[sems[to].kind]) return false;
    return group.every((item) => {
      const prereqsReady = (item.prereqs || []).every((p) =>
        ids.has(p) || state.completed.has(p) || (placedSem[p] !== undefined && placedSem[p] < to));
      const dependentsRemainLater = remaining.every((dependent) =>
        ids.has(dependent.id) || !(dependent.prereqs || []).includes(item.id) || placedSem[dependent.id] > to);
      return prereqsReady && dependentsRemainLater;
    });
  };

  // A few deterministic passes capture moves unlocked by earlier moves without
  // making the schedule jump around on every render.
  for (let pass = 0; pass < 4; pass++) {
    let moved = false;
    for (const course of autoOrder(remaining)) {
      const group = groupById.get(course.id) || [course];
      if (group[0].id !== course.id) continue;
      const from = placedSem[course.id];
      if (from === undefined || group.some((item) => pinned.has(item.id))) continue;
      let best = from;
      let bestCost = groupCost(group, from);
      for (let to = 0; to < from; to++) {
        if (!canMoveGroup(group, from, to)) continue;
        const cost = groupCost(group, to);
        if (cost < bestCost) { best = to; bestCost = cost; }
      }
      if (best === from) continue;
      const fromId = sems[from].id, toId = sems[best].id;
      const ids = new Set(group.map((item) => item.id));
      bySem[fromId] = bySem[fromId].filter((item) => !ids.has(item.id));
      bySem[toId].push(...group);
      const groupCredits = group.reduce((sum, item) => sum + item.credits, 0);
      credits[fromId] -= groupCredits; credits[toId] += groupCredits;
      group.forEach((item) => { placedSem[item.id] = best; });
      moved = true;
    }
    if (!moved) break;
  }
}

// A compacting move often needs a swap: the nearer semester may be full even
// though a low-impact course can safely move in the other direction. This
// local optimiser only accepts a change when it lowers total prerequisite
// distance and keeps every prerequisite, co-requisite and credit rule valid.
function optimizeTermAssignments(columns, { lockedIds = new Set(), creditLimit, maxAdvance = Infinity }) {
  const result = columns.map((col) => ({ ...col, courses: [...col.courses] }));
  const visibleById = new Map(result.flatMap((col) => col.courses).map((course) => [course.id, course]));
  const firstFutureIndex = result.findIndex((column) => column.future);
  let location = new Map();
  let creditTotals = [];
  const refresh = () => {
    location = new Map();
    creditTotals = result.map((col, index) => {
      col.courses.forEach((course) => location.set(course.id, index));
      return col.courses.reduce((sum, course) => sum + course.credits, 0);
    });
  };
  const movable = (course) => {
    const index = location.get(course.id);
    return index !== undefined && result[index].future && !lockedIds.has(course.id) && !(course.coreqs || []).length;
  };
  const distanceCost = (moves = new Map()) => {
    const at = (id) => moves.has(id) ? moves.get(id) : location.get(id);
    let cost = 0;
    for (const course of visibleById.values()) {
      const target = at(course.id);
      for (const prereq of course.prereqs || []) {
        const source = at(prereq);
        if (source !== undefined) cost += Math.abs(target - source);
      }
    }
    return cost;
  };
  const validMoves = (moves) => {
    const at = (id) => moves.has(id) ? moves.get(id) : location.get(id);
    const totals = [...creditTotals];
    for (const [id, destination] of moves) {
      const source = location.get(id);
      const course = visibleById.get(id);
      if (!course || source === undefined || source === destination || !result[destination]?.future || !movable(course)) return false;
      // The untouched official view may bring a course forward a little, but
      // should not turn a later-year course into a first-year course merely
      // because its listed prerequisite happens to be complete.
      if (Number.isFinite(maxAdvance) && destination - firstFutureIndex < course.term - maxAdvance) return false;
      totals[source] -= course.credits; totals[destination] += course.credits;
    }
    if (totals.some((total, index) => total > creditLimit(result[index]))) return false;
    for (const [id, destination] of moves) {
      const course = visibleById.get(id);
      const prereqsReady = (course.prereqs || []).every((prereq) => {
        const source = at(prereq);
        return source === undefined ? state.completed.has(prereq) : source < destination;
      });
      const dependentsLater = [...visibleById.values()].every((dependent) => {
        if (!(dependent.prereqs || []).includes(id)) return true;
        return at(dependent.id) > destination;
      });
      const coreqsTogether = (course.coreqs || []).every((coreq) => at(coreq) === destination);
      if (!prereqsReady || !dependentsLater || !coreqsTogether) return false;
    }
    return true;
  };
  const applyMoves = (moves) => {
    const removals = new Map();
    const additions = new Map();
    for (const [id, destination] of moves) {
      const source = location.get(id);
      if (!removals.has(source)) removals.set(source, new Set());
      removals.get(source).add(id);
      if (!additions.has(destination)) additions.set(destination, []);
      additions.get(destination).push(visibleById.get(id));
    }
    result.forEach((col, index) => {
      if (removals.has(index)) col.courses = col.courses.filter((course) => !removals.get(index).has(course.id));
      if (additions.has(index)) col.courses.push(...additions.get(index));
    });
    refresh();
  };

  refresh();
  for (let pass = 0; pass < 8; pass++) {
    let moved = false;
    const candidates = [...visibleById.values()].filter(movable)
      .sort((a, b) => location.get(b.id) - location.get(a.id));
    for (const course of candidates) {
      const from = location.get(course.id);
      const before = distanceCost();
      let bestMoves = null;
      let bestCost = before;
      const hasVisibleRelation = (course.prereqs || []).some((id) => location.has(id)) ||
        [...visibleById.values()].some((dependent) => (dependent.prereqs || []).includes(course.id));
      const consider = (moves) => {
        if (!validMoves(moves)) return;
        const cost = distanceCost(moves);
        const nearerPrerequisite = !bestMoves || moves.get(course.id) < bestMoves.get(course.id);
        // A neutral swap is still useful when it lets this course follow its
        // prerequisite sooner without increasing total wire distance.
        if (cost < bestCost || (hasVisibleRelation && cost === bestCost && nearerPrerequisite)) {
          bestMoves = moves; bestCost = cost;
        }
      };
      for (let destination = 0; destination < from; destination++) {
        const direct = new Map([[course.id, destination]]);
        consider(direct);
        // When the closer term is full, try exchanging this course with an
        // unpinned course from that term rather than giving up on the route.
        for (const swap of result[destination].courses) {
          if (!movable(swap)) continue;
          const exchanged = new Map([[course.id, destination], [swap.id, from]]);
          consider(exchanged);
        }
      }
      if (!bestMoves) continue;
      applyMoves(bestMoves);
      moved = true;
    }
    if (!moved) break;
  }
  return result;
}

// Barycentric ordering aligns related cards vertically within their own term
// columns. Unrelated cards retain a stable order, and no course changes term.
function optimizeColumnOrder(columns) {
  const ordered = columns.map((col) => ({ ...col, courses: [...col.courses] }));
  const originalRow = new Map();
  ordered.forEach((col) => col.courses.forEach((course, row) => originalRow.set(course.id, row)));
  const neighbors = new Map();
  const connect = (a, b) => {
    if (!neighbors.has(a)) neighbors.set(a, []);
    if (!neighbors.has(b)) neighbors.set(b, []);
    neighbors.get(a).push(b); neighbors.get(b).push(a);
  };
  COURSES.forEach((course) => {
    (course.prereqs || []).forEach((prereq) => connect(course.id, prereq));
    (course.coreqs || []).forEach((coreq) => connect(course.id, coreq));
  });
  const currentRows = () => {
    const rows = new Map();
    ordered.forEach((col, column) => col.courses.forEach((course, row) => rows.set(course.id, { column, row })));
    return rows;
  };
  for (let pass = 0; pass < 4; pass++) {
    for (const indices of [ordered.map((_, i) => i), ordered.map((_, i) => i).reverse()]) {
      for (const index of indices) {
        const rows = currentRows();
        const barycenter = (course) => {
          const linkedRows = (neighbors.get(course.id) || []).map((id) => rows.get(id))
            .filter((pos) => pos && pos.column !== index).map((pos) => pos.row);
          return linkedRows.length ? linkedRows.reduce((sum, row) => sum + row, 0) / linkedRows.length : rows.get(course.id).row;
        };
        ordered[index].courses.sort((a, b) => barycenter(a) - barycenter(b) ||
          rows.get(a.id).row - rows.get(b.id).row || originalRow.get(a.id) - originalRow.get(b.id));
      }
    }
  }
  return ordered;
}

function preferredCourseGroups(courses, preferred = 5, minimum = 3) {
  if (!courses.length) return [];
  if (courses.length <= preferred) return [[...courses]];
  let groupCount = Math.ceil(courses.length / preferred);
  while (groupCount > 1 && Math.floor(courses.length / groupCount) < minimum) groupCount--;
  const base = Math.floor(courses.length / groupCount);
  const extra = courses.length % groupCount;
  const groups = [];
  let offset = 0;
  for (let index = 0; index < groupCount; index++) {
    const size = base + (index < extra ? 1 : 0);
    groups.push(courses.slice(offset, offset + size));
    offset += size;
  }
  return groups;
}

// Smooth auto-generated future terms toward five courses, while avoiding
// one- and two-course terms whenever prerequisite order and credit limits
// permit it. Manual pins, summers and co-requisite groups are left untouched.
function balanceFutureCourseCounts(columns, lockedIds, minimum = 3, preferred = 5) {
  const result = columns.map((column) => ({ ...column, courses: [...column.courses] }));
  let locations = new Map();
  let allCourses = [];
  const refresh = () => {
    locations = new Map();
    allCourses = result.flatMap((column, index) => column.courses.map((course) => {
      locations.set(course.id, index);
      return course;
    }));
  };
  const creditsAt = (index) => result[index].courses.reduce((sum, course) => sum + course.credits, 0);
  const canMove = (course, from, to) => {
    if (from === to || lockedIds.has(course.id) || (course.coreqs || []).length) return false;
    if (!result[from]?.future || !result[to]?.future || result[from].kind !== result[to].kind) return false;
    if (result[to].courses.length >= preferred) return false;
    if (creditsAt(to) + course.credits > AUTO_CAP[result[to].kind]) return false;
    const prereqsReady = (course.prereqs || []).every((id) =>
      state.completed.has(id) || (locations.has(id) && locations.get(id) < to));
    const dependentsLater = allCourses.every((dependent) =>
      !(dependent.prereqs || []).includes(course.id) || locations.get(dependent.id) > to);
    return prereqsReady && dependentsLater;
  };
  const move = (course, from, to) => {
    result[from].courses = result[from].courses.filter((item) => item.id !== course.id);
    result[to].courses.push(course);
    refresh();
  };

  refresh();
  for (let pass = 0; pass < 4; pass++) {
    let changed = false;
    for (let index = result.length - 1; index >= 0; index--) {
      if (!result[index].future || result[index].kind === "summer" || result[index].courses.length >= minimum) continue;

      // Prefer eliminating a sparse auto term by moving its courses backward.
      for (const course of [...result[index].courses]) {
        for (let destination = index - 1; destination >= 0; destination--) {
          if (!canMove(course, index, destination)) continue;
          move(course, index, destination); changed = true; break;
        }
      }

      // If prerequisite order prevents that, move safe courses forward from a
      // fuller earlier term until this term reaches the minimum.
      while (result[index].courses.length > 0 && result[index].courses.length < minimum) {
        let borrowed = false;
        for (let source = index - 1; source >= 0 && !borrowed; source--) {
          if (result[source].courses.length <= minimum) continue;
          for (const course of [...result[source].courses].reverse()) {
            if (!canMove(course, source, index)) continue;
            move(course, source, index); changed = borrowed = true; break;
          }
        }
        if (!borrowed) break;
      }
    }
    if (!changed) break;
  }
  return result.filter((column) => !(column.auto && column.courses.length === 0));
}

// Build the full column layout. Returns { columns, futureIds }.
function computeLayout() {
  const lang = state.lang;

  // ---- past columns from the transcript ----
  const pastMap = new Map(); // key -> {label, sort, courses}
  const undatedCompleted = [];
  COURSES.filter((c2) => state.completed.has(c2.id)).forEach((c2) => {
    const meta = state.completedMeta[c2.id] || {};
    const parsed = parseTermName(meta.term);
    // Study plans prove completion but omit the historical semester. Keep
    // those cards at the left in compact curriculum-order groups so the right
    // side can focus entirely on the future schedule.
    if (!parsed) { undatedCompleted.push(c2); return; }
    const key = `p${parsed.y}-${parsed.season}`;
    if (!pastMap.has(key)) {
      pastMap.set(key, {
        label: termLabelOf(parsed.season, parsed.y),
        sort: parsed.y * 10 + parsed.season,
        summer: parsed.season === 2,
        parsed,
        courses: []
      });
    }
    pastMap.get(key).courses.push(c2);
  });
  const datedPast = [...pastMap.values()].sort((a, b) => a.sort - b.sort);
  const undatedPast = preferredCourseGroups([...undatedCompleted].sort((a, b) =>
    a.term - b.term || a.id.localeCompare(b.id)))
    .map((courses, groupIndex) => ({
      id: `undated-past-${groupIndex}`,
      label: `${t("pastNoTerm")} ${groupIndex + 1}`,
      sort: 1e8 + groupIndex,
      summer: false,
      parsed: null,
      courses
    }));
  const past = [...datedPast, ...undatedPast];
  const lastParsedPast = [...datedPast].reverse().find((p) => p.parsed);

  const remaining = COURSES.filter((c2) => !state.completed.has(c2.id));

  // ---- canonical mode: untouched default plan ----
  if (!state.futureSems && past.length === 0 && !Object.keys(state.placements).length) {
    const columns = TERM_COLUMNS.map((col, i) => {
      const courses = remaining.filter((c2) => c2.term === i);
      return {
        id: `f${i + 1}`, kind: "regular", canonicalIndex: i, season: i % 2,
        title: col[lang], future: true, courses,
        credits: courses.reduce((s, c2) => s + c2.credits, 0)
      };
    });
    const compacted = optimizeTermAssignments(columns, {
      creditLimit: (column) => WARN_CAP[column.kind === "summer" ? "summer" : "regular"],
      maxAdvance: 2
    });
    return { columns: optimizeColumnOrder(compacted), canonical: true };
  }

  // ---- scheduled mode ----
  if (!state.futureSems) state.futureSems = [];
  sanitizePinnedPlacements();
  const sems = state.futureSems;
  const bySem = {}; const credits = {};
  sems.forEach((s2) => { bySem[s2.id] = []; credits[s2.id] = 0; });

  // User-pinned courses first (pins win over capacity, never over prerequisite
  // order: sanitizePinnedPlacements() above has removed invalid pins).
  const pinned = new Set();
  remaining.forEach((c2) => {
    const semId = state.placements[c2.id];
    if (semId && bySem[semId]) { bySem[semId].push(c2); credits[semId] += c2.credits; pinned.add(c2.id); }
  });

  // auto-place the rest topologically, coreq partners together
  const queue = autoOrder(remaining.filter((c2) => !pinned.has(c2.id)));
  const placedSem = {}; // courseId -> sem index
  remaining.forEach((c2) => { if (pinned.has(c2.id)) placedSem[c2.id] = sems.findIndex((s2) => s2.id === state.placements[c2.id]); });
  const groupOf = (c2) => {
    const ids = new Set([c2.id]);
    (c2.coreqs || []).forEach((id) => { if (queue.some((q2) => q2.id === id)) ids.add(id); });
    queue.forEach((q2) => { if ((q2.coreqs || []).includes(c2.id)) ids.add(q2.id); });
    return [...ids].map((id) => courseById.get(id));
  };
  const unplaced = new Set(queue.map((c2) => c2.id));
  let guard = 0;
  while (unplaced.size && guard++ < 200) {
    let progress = false;
    for (let si = 0; si < sems.length && unplaced.size; si++) {
      const sem = sems[si];
      const cap = AUTO_CAP[sem.kind];
      for (const c2 of queue) {
        if (!unplaced.has(c2.id)) continue;
        const group = groupOf(c2).filter((g) => unplaced.has(g.id));
        const gCredits = group.reduce((s, g) => s + g.credits, 0);
        const ready = group.every((g) => (g.prereqs || []).every((p) =>
          state.completed.has(p) || (placedSem[p] !== undefined && placedSem[p] < si)));
        if (!ready) continue;
        // Do not auto-place a prerequisite at/after a pinned dependent.
        const blocksPinnedDependent = group.some((g) => remaining.some((d) =>
          pinned.has(d.id) && (d.prereqs || []).includes(g.id) && placedSem[d.id] <= si));
        if (blocksPinnedDependent) continue;
        if (credits[sem.id] + gCredits > cap && credits[sem.id] > 0) continue;
        group.forEach((g) => {
          bySem[sem.id].push(g); credits[sem.id] += g.credits;
          placedSem[g.id] = si; unplaced.delete(g.id);
        });
        progress = true;
      }
    }
    if (unplaced.size) {
      // not enough room: grow the plan with another regular semester
      sems.push({ id: newSemId(), kind: "regular", auto: true });
      const ns = sems[sems.length - 1];
      bySem[ns.id] = []; credits[ns.id] = 0;
      if (!progress && guard > 150) break; // safety valve
    }
  }
  compactSemesterPlacements(bySem, credits, pinned, placedSem, sems, remaining);
  const compactedTerms = optimizeTermAssignments([
    ...past.map((item, index) => ({
      id: `past-layout-${index}`, kind: item.summer ? "summer" : "regular", future: false, courses: item.courses
    })),
    ...sems.map((sem) => ({ id: sem.id, kind: sem.kind, future: true, courses: bySem[sem.id] || [] }))
  ], {
    lockedIds: pinned,
    creditLimit: (column) => AUTO_CAP[column.kind === "summer" ? "summer" : "regular"]
  });
  compactedTerms.filter((column) => column.future).forEach((column) => {
    bySem[column.id] = column.courses;
    credits[column.id] = column.courses.reduce((sum, course) => sum + course.credits, 0);
    const futureIndex = sems.findIndex((sem) => sem.id === column.id);
    column.courses.forEach((course) => { placedSem[course.id] = futureIndex; });
  });

  const balancedSchedule = balanceFutureCourseCounts(sems.map((sem) => ({
    ...sem, future: true, courses: bySem[sem.id] || []
  })), pinned);
  sems.splice(0, sems.length, ...balancedSchedule.map(({ id, kind, auto }) => ({ id, kind, auto })));
  balancedSchedule.forEach((column) => {
    bySem[column.id] = column.courses;
    credits[column.id] = column.courses.reduce((sum, course) => sum + course.credits, 0);
  });

  // ---- labels for future terms ----
  let cursor = lastParsedPast
    ? (lastParsedPast.parsed.season === 2
        ? { season: 0, y: lastParsedPast.parsed.y + 1 }
        : nextRegular(lastParsedPast.parsed))
    : { season: 0, y: 0 };
  let regCount = 0;
  const hasYears = Boolean(lastParsedPast);
  const futureCols = sems.map((s2) => {
    let title, season;
    if (s2.kind === "summer") {
      season = 2;
      // summer belongs to the academic year of the spring before it
      title = hasYears ? termLabelOf(2, cursor.season === 0 ? cursor.y - 1 : cursor.y) : t("summerWord");
    } else if (hasYears) {
      season = cursor.season;
      title = termLabelOf(cursor.season, cursor.y);
      cursor = nextRegular(cursor);
    } else {
      season = regCount % 2;
      const yearN = Math.floor(regCount / 2) + 1;
      title = `${t("yearWord")} ${yearN} - ${season === 0 ? t("fallWord") : t("springWord")}`;
      regCount++;
    }
    return {
      id: s2.id, kind: s2.kind, future: true,
      title, courses: bySem[s2.id] || [],
      credits: credits[s2.id] || 0,
      season
    };
  });

  const pastCols = past.map((p, i) => ({
    id: `past-${i}`, kind: p.summer ? "summer" : "regular", past: true,
    title: p.label, courses: p.courses,
    credits: p.courses.reduce((s, c2) => s + c2.credits, 0)
  }));

  return { columns: optimizeColumnOrder([...pastCols, ...futureCols]), canonical: false };
}

// Switch from the canonical plan to an editable one, keeping the same layout
// (every remaining course gets pinned where it currently sits).
function materializePlan() {
  if (state.futureSems) return;
  const layout = computeLayout();
  if (!layout.canonical) return;
  state.futureSems = layout.columns.map((col) => ({ id: col.id, kind: "regular" }));
  semIdCounter = state.futureSems.length;
  layout.columns.forEach((col) => {
    col.courses.forEach((c2) => { state.placements[c2.id] = col.id; });
  });
}

// Pin every future course exactly where it currently renders, so a drag/drop
// moves ONE card and never reshuffles the auto-scheduled ones around it.
function freezeCurrentLayout() {
  materializePlan();
  const layout = computeLayout();
  layout.columns.forEach((col) => {
    if (!col.future) return;
    col.courses.forEach((c2) => { state.placements[c2.id] = col.id; });
  });
}

function addSummerBefore(futureSemId) {
  materializePlan();
  const idx = state.futureSems.findIndex((s2) => s2.id === futureSemId);
  state.futureSems.splice(Math.max(0, idx), 0, { id: newSemId(), kind: "summer" });
  saveState();
  renderAll();
}

function addTermAtEnd() {
  materializePlan();
  state.futureSems.push({ id: newSemId(), kind: "regular" });
  saveState();
  renderAll();
}

function removeFutureTerm(futureSemId) {
  if (!state.futureSems) return;
  const idx = state.futureSems.findIndex((s2) => s2.id === futureSemId);
  if (idx >= 0) {
    state.futureSems.splice(idx, 1);
    Object.keys(state.placements).forEach((cid) => {
      if (state.placements[cid] === futureSemId) delete state.placements[cid];
    });
    if (state.eligibilitySemesterId === futureSemId) state.eligibilitySemesterId = null;
    saveState();
    renderAll();
  }
}

function renderFlowchart() {
  const layout = computeLayout();
  const cols = layout.columns;
  const activeSemesterId = cols.some((column) => column.future && column.id === state.eligibilitySemesterId)
    ? state.eligibilitySemesterId : null;
  state.eligibilitySemesterId = activeSemesterId;
  elements.flowchart.style.setProperty("--term-count", cols.length + 1);

  const renderedColumns = cols.map((col, i) => {
    const over = col.credits > WARN_CAP[col.kind === "summer" ? "summer" : "regular"];
    const warn = over
      ? `<div class="credit-warn"><svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path fill="currentColor" d="M12 2 1 21h22L12 2zm1 14h-2v2h2v-2zm0-7h-2v5h2V9z"/></svg><span>${col.kind === "summer" ? t("creditWarn9") : t("creditWarn18")}</span></div>`
      : "";
    // "+ summer" gutter button: before a future fall column whose predecessor isn't already a summer
    const prev = cols[i - 1];
    const showSummerPlus = col.future && col.kind === "regular" && col.season !== 1 &&
      (!prev || prev.kind !== "summer") && i > 0;
    const plusBtn = showSummerPlus
      ? `<button type="button" class="add-summer-btn" data-add-summer="${col.id}" title="${t("addSummer")}" aria-label="${t("addSummer")}">+</button>`
      : "";
    // User-added summer terms can always be removed. Their courses are
    // unpinned and automatically returned to the remaining plan. Regular
    // terms retain the safer empty-only removal rule.
    const canRemove = col.future && state.futureSems &&
      (col.kind === "summer" || !col.courses.length);
    const removeBtn = canRemove
      ? `<button type="button" class="ghost-button term-remove" data-remove-term="${col.id}" title="${t("removeTerm")}" aria-label="${t("removeTerm")}">×</button>`
      : "";
    return `
      <div class="term-column ${col.kind === "summer" ? "summer-column" : ""} ${col.future && col.id === activeSemesterId ? "is-eligibility-target" : ""}" data-col-id="${col.id}" data-future-sem-id="${col.future ? col.id : ""}">
        ${plusBtn}
        <div class="term-title"><strong>${col.title}</strong><span>${col.credits} ${t("creditUnit")}${col.past ? " ✓" : ""}</span>${removeBtn}</div>
        ${warn}
        <div class="term-courses" data-sem-id="${col.future ? col.id : ""}">${col.courses.map((c2) => renderCourseCard(c2, col, layout, activeSemesterId)).join("")}</div>
      </div>`;
  });

  const addCol = `
    <button type="button" class="add-term-column" id="add-term-btn" title="${t("addTerm")}">
      <span class="plus-circle">+</span>
      <span>${t("addTerm")}</span>
    </button>`;

  // On phones each existing semester title becomes its own vertical rail, so
  // no separate year wrapper/header is needed.
  elements.flowchart.innerHTML = renderedColumns.join("") + addCol;

  // interactions
  elements.flowchart.querySelectorAll(".course-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.selectedCourseId = btn.dataset.courseId;
      state.bannerMessage = "";
      renderFlowchart();
      renderDetail();
      openDetailDrawer();
      requestAnimationFrame(drawArrows);
    });
  });
  const toggleSemesterEligibility = (semesterId) => {
    state.eligibilitySemesterId = state.eligibilitySemesterId === semesterId ? null : semesterId;
    state.selectedCourseId = null;
    state.bannerMessage = "";
    elements.drawer.classList.remove("is-open");
    elements.drawer.setAttribute("aria-hidden", "true");
    renderFlowchart();
    renderDetail();
    requestAnimationFrame(drawArrows);
  };
  elements.flowchart.querySelectorAll(".term-column[data-future-sem-id]").forEach((column) => {
    const semesterId = column.dataset.futureSemId;
    const header = column.querySelector(".term-title");
    if (!semesterId || !header) return;
    header.setAttribute("role", "button");
    header.setAttribute("tabindex", "0");
    header.setAttribute("aria-pressed", String(semesterId === activeSemesterId));
    header.setAttribute("title", t("semesterEligibility"));
    header.addEventListener("click", (ev) => {
      if (ev.target.closest("[data-remove-term]")) return;
      toggleSemesterEligibility(semesterId);
    });
    header.addEventListener("keydown", (ev) => {
      if (ev.key !== "Enter" && ev.key !== " ") return;
      ev.preventDefault();
      toggleSemesterEligibility(semesterId);
    });
  });
  elements.flowchart.querySelectorAll("[data-add-summer]").forEach((btn) => {
    btn.addEventListener("click", (ev) => { ev.stopPropagation(); addSummerBefore(btn.dataset.addSummer); });
  });
  elements.flowchart.querySelectorAll("[data-remove-term]").forEach((btn) => {
    btn.addEventListener("click", (ev) => { ev.stopPropagation(); removeFutureTerm(btn.dataset.removeTerm); });
  });
  const addBtn = elements.flowchart.querySelector("#add-term-btn");
  if (addBtn) addBtn.addEventListener("click", addTermAtEnd);
  elements.flowchart.addEventListener("click", (ev) => {
    if (!state.selectedCourseId || ev.target.closest(".course-card, .term-title, button")) return;
    closeDetailDrawer();
  });
  bindDragAndDrop();
}

// ---------- drag & drop ----------
function bindDragAndDrop() {
  elements.flowchart.querySelectorAll('.course-card[draggable="true"]').forEach((card) => {
    card.addEventListener("dragstart", (ev) => {
      ev.dataTransfer.setData("text/plain", card.dataset.courseId);
      ev.dataTransfer.effectAllowed = "move";
      card.classList.add("is-dragging");
    });
    card.addEventListener("dragend", () => card.classList.remove("is-dragging"));
  });
  elements.flowchart.querySelectorAll(".term-courses[data-sem-id]").forEach((zone) => {
    if (!zone.dataset.semId) return;
    zone.addEventListener("dragover", (ev) => { ev.preventDefault(); ev.dataTransfer.dropEffect = "move"; zone.classList.add("drop-ok"); });
    zone.addEventListener("dragleave", () => zone.classList.remove("drop-ok"));
    zone.addEventListener("drop", (ev) => {
      ev.preventDefault();
      zone.classList.remove("drop-ok");
      const courseId = ev.dataTransfer.getData("text/plain");
      if (!courseId || !courseById.has(courseId) || state.completed.has(courseId)) return;
      freezeCurrentLayout();
      if (!placementIsValid(courseId, zone.dataset.semId)) {
        zone.classList.add("drop-invalid");
        setTimeout(() => zone.classList.remove("drop-invalid"), 900);
        showPlannerNotice(t("invalidPlacement"));
        return;
      }
      state.placements[courseId] = zone.dataset.semId;
      showPlannerNotice();
      saveState();
      renderAll();
    });
  });
}

function renderCourseCard(course, col, layout, eligibilitySemesterId) {
  const isComplete = state.completed.has(course.id);
  const isPlanned = state.sections.some((s) => s.courseId === course.id);
  const isSelected = state.selectedCourseId === course.id;
  const unlocked = isUnlocked(course);
  const semesterEligibility = !isComplete
    ? eligibilityForSemester(course, layout, eligibilitySemesterId) : null;
  const eligibilityClass = semesterEligibility
    ? (semesterEligibility.eligible ? "is-semester-eligible" : "is-semester-ineligible") : "";
  const eligibilityLabel = semesterEligibility
    ? (semesterEligibility.eligible ? t("courseEligible") : t("courseIneligible")) : "";
  const draggable = Boolean(col && col.future && !isComplete);
  const meta = state.completedMeta[course.id];
  // Only show a concrete elective title once this student picked/scanned one;
  // otherwise keep the generic slot placeholder (electives differ per student).
  const electiveSel = course.elective && state.electiveSelections[course.id]
    ? getSelectedElective(course.id) : null;
  const classes = [
    "course-card",
    course.elective ? "is-elective" : "",
    isComplete ? "is-complete" : "",
    !isComplete && isPlanned ? "is-planned" : "",
    !isComplete && !isPlanned && !course.elective && unlocked ? "is-available" : "",
    !isComplete && !isPlanned && !course.elective && !unlocked ? "is-locked" : "",
    eligibilityClass,
    isSelected ? "is-selected" : ""
  ].filter(Boolean).join(" ");
  const title = electiveSel ? electiveSel.title : course.title;
  const statusLabel = isComplete
    ? t("tabComplete")
    : isPlanned
      ? t("tabPlanned")
      : course.elective
        ? t("tabElective")
        : unlocked
          ? t("tabAvailable")
          : t("tabLocked");
  return `
    <button class="${classes}" type="button" draggable="${draggable}" data-course-id="${course.id}" aria-pressed="${isSelected}" aria-label="${formatCourseCode(course)} ${title} — ${statusLabel}" title="${eligibilityLabel}">
      <span class="status-flag" aria-hidden="true"><svg viewBox="0 0 24 24"><path fill="currentColor" d="${semesterEligibility && !semesterEligibility.eligible ? "M7 7l10 10M17 7 7 17" : "M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"}"/></svg></span>
      <span class="card-top">
        <span class="course-code">${formatCourseCode(course)}</span>
        <span class="course-credits">${course.credits} ${t("unit3")}</span>
      </span>
      <strong>${title}</strong>
      ${meta && meta.term
        ? `<span class="actual-term">${meta.grade ? meta.grade + " · " : ""}${meta.term}</span>`
        : `<span class="course-group">${course.group}</span>`}
    </button>`;
}

function getElectiveOptions(id) { return ELECTIVE_OPTIONS[id] || []; }
function getSelectedElective(id) {
  const opts = getElectiveOptions(id);
  const selId = state.electiveSelections[id] || (opts[0] && opts[0].id);
  return opts.find((o) => o.id === selId) || opts[0] || null;
}

// ---------- live offerings (Banner proxy) ----------
function offeringTarget(course) {
  if (course.elective) {
    const sel = getSelectedElective(course.id);
    return sel ? { subj: sel.subj, crse: sel.num } : null;
  }
  return { subj: course.subj, crse: course.num };
}

async function fetchOfferings(course) {
  if (!OFFERINGS_ENABLED) return { status: "unavailable", sections: [] };
  const target = offeringTarget(course);
  if (!target) return { status: "empty", sections: [] };
  const term = elements.termSelect.value;
  const key = `${term}:${target.subj}:${target.crse}`;
  if (offeringsCache[key]) return offeringsCache[key];
  try {
    const res = await fetch(`/api/sections?term=${term}&subj=${target.subj}&crse=${target.crse}`);
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || "banner");
    const sections = (data.sections || []).map((s) => normalizeSection(s, course.id));
    const result = { status: "ok", sections };
    offeringsCache[key] = result;
    return result;
  } catch (err) {
    return { status: "error", sections: [], error: String(err) };
  }
}

function normalizeSection(s, courseId) {
  const meeting = (s.meetings && s.meetings[0]) || {};
  return {
    courseId, crn: s.crn, section: s.section, professor: s.professor,
    time: meeting.time || "", days: meeting.days || [],
    start: meeting.start || "", end: meeting.end || "",
    room: meeting.room || "", type: meeting.type || "",
    meetings: s.meetings || []
  };
}

// ---------- detail drawer ----------
async function renderDetail() {
  const course = courseById.get(state.selectedCourseId);
  if (!course) {
    elements.courseDetail.innerHTML = `<div class="detail-empty">${state.lang === "ar" ? "اختر مقررًا من الخريطة." : "Select a course from the map."}</div>`;
    return;
  }
  const status = getCourseStatus(course);
  const prereqs = course.prereqs || [];
  const coreqs = course.coreqs || [];
  const opens = COURSES.filter((it) => (it.prereqs || []).includes(course.id));
  const selElec = course.elective ? getSelectedElective(course.id) : null;
  const displayTitle = selElec ? selElec.title : course.title;
  const activeDept = selElec ? (selElec.dept ? selElec.dept[state.lang] : "") : deptName(course);
  const termLabel = (TERMS[elements.termSelect.value] || {})[state.lang] || "";

  elements.courseDetail.innerHTML = `
    <h3 class="detail-title">${formatCourseCode(course)} ${displayTitle}</h3>
    <div class="detail-meta">
      <span class="tag ${status.className}">${status.label}</span>
      <span class="tag">${course.credits} ${t("creditUnit")}</span>
      <span class="tag">${course.group}</span>
      ${activeDept ? `<span class="tag">${activeDept}</span>` : ""}
      <span class="tag">${termLabel}</span>
    </div>
    ${course.elective ? renderElectiveChoices(course) : ""}
    <div class="detail-block"><label>${t("prereq")}</label><p>${prereqs.length ? prereqs.map(formatCourseShort).join("، ") : t("none")}</p></div>
    <div class="detail-block"><label>${t("coreq")}</label><p>${coreqs.length ? coreqs.map(formatCourseShort).join("، ") : t("none")}</p></div>
    <div class="detail-block"><label>${t("opens")}</label><p>${opens.length ? opens.map((it) => formatCourseShort(it.id)).join("، ") : t("noDirectOpen")}</p></div>
    <div class="detail-actions">
      <button type="button" id="toggle-complete">${state.completed.has(course.id) ? t("unmarkComplete") : t("markComplete")}</button>
      ${OFFERINGS_ENABLED ? `<button type="button" class="secondary-button" id="banner-refresh">${t("refreshBanner")}</button>` : ""}
    </div>
    <div class="offering-list" id="offering-list"><div class="detail-empty">${t("loadingSections")}</div></div>
    ${state.bannerMessage ? `<p class="banner-note">${state.bannerMessage}</p>` : ""}`;

  document.querySelector("#toggle-complete").addEventListener("click", () => toggleCompleted(course.id));
  document.querySelector("#banner-refresh")?.addEventListener("click", () => {
    const target = offeringTarget(course);
    if (target) delete offeringsCache[`${elements.termSelect.value}:${target.subj}:${target.crse}`];
    renderOfferings(course);
  });
  const sel = document.querySelector("#elective-choice");
  if (sel) {
    sel.addEventListener("change", () => {
      state.electiveSelections[course.id] = sel.value;
      saveState();
      renderFlowchart();
      renderDetail();
      requestAnimationFrame(drawArrows);
    });
  }
  renderOfferings(course);
}

function renderElectiveChoices(course) {
  const choices = getElectiveOptions(course.id);
  const selId = state.electiveSelections[course.id] || (choices[0] && choices[0].id) || "";
  return `
    <div class="elective-picker">
      <label for="elective-choice">${t("chooseElective")}</label>
      <select id="elective-choice">
        ${choices.map((ch) => `<option value="${ch.id}" ${ch.id === selId ? "selected" : ""}>${ch.title}</option>`).join("")}
      </select>
    </div>`;
}

async function renderOfferings(course) {
  const container = document.querySelector("#offering-list");
  if (!container) return;
  if (!OFFERINGS_ENABLED) {
    container.innerHTML = `<div class="detail-empty">${t("offeringsUnavailable")}</div>`;
    return;
  }
  container.innerHTML = `<div class="detail-empty">${t("loadingSections")}</div>`;
  const result = await fetchOfferings(course);
  // ignore if user navigated away
  if (state.selectedCourseId !== course.id) return;
  if (result.status === "error") {
    container.innerHTML = `<div class="detail-empty">${t("bannerError")}</div>`;
    return;
  }
  if (!result.sections.length) {
    container.innerHTML = `<div class="detail-empty">${t("noOfferings")}</div>`;
    return;
  }
  container.innerHTML = result.sections.map((o, i) => renderOffering(o, i)).join("");
  container.querySelectorAll("[data-add-section]").forEach((btn) => {
    btn.addEventListener("click", () => addSection(result.sections[Number(btn.dataset.addSection)]));
  });
}

function renderOffering(o, index) {
  return `
    <article class="offering-card">
      <h3><span>${t("section")} ${o.section}</span><span>${t("crn")} ${o.crn}</span></h3>
      <dl>
        <dt>${t("time")}</dt><dd>${o.time || "—"}</dd>
        <dt>${t("days")}</dt><dd>${o.days.length ? formatDays(o.days) : "—"}</dd>
        <dt>${t("professor")}</dt><dd>${o.professor}</dd>
        <dt>${t("place")}</dt><dd>${o.room || "—"}</dd>
        <dt>${t("type")}</dt><dd>${o.type || "—"}</dd>
      </dl>
      <button type="button" data-add-section="${index}">${t("add")}</button>
    </article>`;
}

// ---------- progress ----------
function renderProgress() {
  const done = COURSES.filter((c2) => state.completed.has(c2.id));
  const credits = done.reduce((s, c2) => s + c2.credits, 0);
  const pct = Math.min(100, Math.round((credits / TOTAL_CREDITS) * 100));
  elements.progressLabel.textContent = `${credits}/${TOTAL_CREDITS}`;
  if (elements.progressRing) elements.progressRing.style.setProperty("--pct", pct);
  if (elements.headerProgressText) elements.headerProgressText.textContent = `${credits} / ${TOTAL_CREDITS} ${t("creditUnit")}`;
  elements.completedList.innerHTML = done.length
    ? renderCompletedByTerm(done)
    : `<div class="detail-empty">${t("recordEmpty")}</div>`;
}

function renderCompletedByTerm(done) {
  const groups = done.reduce((acc, course) => {
    const meta = state.completedMeta[course.id] || {};
    const term = meta.term || (state.lang === "ar" ? "بدون فصل" : "No term");
    (acc[term] = acc[term] || []).push(course);
    return acc;
  }, {});
  return Object.entries(groups).map(([term, courses]) => `
    <div class="completed-term">
      <h3>${term}</h3>
      ${courses.map((course) => {
        const meta = state.completedMeta[course.id] || {};
        const sel = course.elective ? getSelectedElective(course.id) : null;
        return `<div class="completed-pill">
          <span>${formatCourseCode(course)}</span>
          <strong>${meta.title || (sel && sel.title) || course.title}</strong>
          ${meta.grade ? `<small>${meta.grade}</small>` : ""}
        </div>`;
      }).join("")}
    </div>`).join("");
}

// ---------- scan stats panel ----------
function renderScanStats() {
  if (!elements.scanStats) return;
  const s = state.scanStats;
  if (!s) { elements.scanStats.hidden = true; elements.scanStats.innerHTML = ""; return; }
  elements.scanStats.hidden = false;
  elements.scanStats.innerHTML = `
    <h3>${t("statsTitle")}</h3>
    <div class="stat-row"><span>${t("statsRead")}</span><strong>${s.read} / ${s.expected}</strong></div>
    <div class="stat-row"><span>${t("statsPassed")}</span><strong>${s.passed}</strong></div>
    ${s.unread && s.unread.length ? `<div class="stat-unread"><span>${t("statsUnread")}:</span> ${s.unread.join("، ")}</div>` : ""}`;
}

// ---------- schedule ----------
function renderSchedule() {
  renderSelectedSections();
  renderCalendar();
  const credits = state.sections.reduce((s, it) => s + ((courseById.get(it.courseId) || {}).credits || 0), 0);
  elements.scheduleSummary.textContent = state.sections.length
    ? t("sectionsSummary", state.sections.length, credits)
    : t("noSections");
}

function renderSelectedSections() {
  elements.selectedSections.innerHTML = state.sections.map((it, i) => {
    const course = courseById.get(it.courseId);
    const title = course && course.elective ? (getSelectedElective(course.id) || {}).title : (course && course.title);
    return `<article class="selected-card">
      <strong>${formatCourseCode(course)} ${title || ""}</strong>
      <span>${t("crn")} ${it.crn} | ${formatDays(it.days)} | ${it.time}</span>
      <span>${it.professor}</span>
      <button type="button" data-remove-section="${i}">${t("remove")}</button>
    </article>`;
  }).join("");
  elements.selectedSections.querySelectorAll("[data-remove-section]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.sections.splice(Number(btn.dataset.removeSection), 1);
      saveState();
      renderFlowchart();
      renderSchedule();
      requestAnimationFrame(drawArrows);
    });
  });
}

function renderCalendar() {
  const header = `<div class="calendar-head">${t("time_word")}</div>${DAYS.map((d) => `<div class="calendar-head">${d[state.lang]}</div>`).join("")}`;
  const rows = HOURS.map((hour) => {
    const cells = DAYS.map((day) => {
      const blocks = state.sections
        .filter((it) => Array.isArray(it.days) && it.days.includes(day.id) && (it.start || "").slice(0, 2) === hour.slice(0, 2))
        .map((it) => {
          const course = courseById.get(it.courseId);
          const title = course && course.elective ? (getSelectedElective(course.id) || {}).title : (course && course.title);
          return `<div class="class-block">${formatCourseCode(course)}<span>${title || ""}</span><span>${it.time}</span><span>${it.room}</span></div>`;
        }).join("");
      return `<div class="calendar-cell">${blocks}</div>`;
    }).join("");
    return `<div class="calendar-cell time-cell">${hour}</div>${cells}`;
  }).join("");
  elements.calendar.innerHTML = header + rows;
}

function addSection(offering) {
  if (!offering) return;
  if (state.sections.some((it) => it.courseId === offering.courseId && it.crn === offering.crn)) return;
  state.sections.push({ ...offering });
  saveState();
  renderFlowchart();
  renderSchedule();
  requestAnimationFrame(drawArrows);
}

// ---------- arrows ----------
function arrowColors() {
  const cs = getComputedStyle(document.documentElement);
  return {
    prereq: (cs.getPropertyValue("--arrow-prereq") || "#0f766e").trim(),
    coreq: (cs.getPropertyValue("--arrow-coreq") || "#d97706").trim(),
    surface: (cs.getPropertyValue("--surface") || "#ffffff").trim()
  };
}

function drawArrows() {
  if (!elements.arrows || !elements.flowchart) return;
  if (window.matchMedia("(max-width: 620px)").matches) {
    drawMobileArrows();
    return;
  }
  const fc = elements.flowchart;
  const w = fc.scrollWidth, h = fc.scrollHeight;
  elements.arrows.setAttribute("width", w);
  elements.arrows.setAttribute("height", h);
  elements.arrows.setAttribute("viewBox", `0 0 ${w} ${h}`);
  const fcRect = fc.getBoundingClientRect();
  const selected = state.selectedCourseId;
  const hasSel = Boolean(fc.querySelector(`[data-course-id="${selected}"]`));
  const colors = arrowColors();
  const defs = `<defs>
    <marker id="arrow-prereq" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0.5,1.2 L9,5 L0.5,8.8 Z" fill="${colors.prereq}"></path></marker>
    <marker id="arrow-coreq" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0.5,1.2 L9,5 L0.5,8.8 Z" fill="${colors.coreq}"></path></marker>
  </defs>`;

  // Geometry snapshot: per column, its x-range and card rects (relative
  // coords). Long arrows route between cards, with the semester-header band
  // reserved as a no-route zone.
  const geo = {
    cols: [...fc.querySelectorAll(".term-column")].map((el) => {
      const r = el.getBoundingClientRect();
      const title = el.querySelector(".term-title")?.getBoundingClientRect();
      return {
        left: r.left - fcRect.left,
        right: r.right - fcRect.left,
        titleBottom: title ? title.bottom - fcRect.top : r.top - fcRect.top,
        cards: [...el.querySelectorAll(".course-card")].map((c2) => {
          const cr = c2.getBoundingClientRect();
          return { top: cr.top - fcRect.top, bottom: cr.bottom - fcRect.top };
        })
      };
    }),
    // Keep every horizontal rail below the whole row of semester/year cards,
    // including when a sticky title is visible during vertical scrolling.
    headerFloor: 0,
    routeBottom: 0
  };
  geo.headerFloor = Math.max(0, ...geo.cols.map((col) => col.titleBottom)) + 14;
  // Rails belong inside the rendered chart canvas, never below it.
  geo.routeBottom = Math.max(geo.headerFloor, h - 18);
  const colIndexOf = (cardEl) => geo.cols.findIndex((col) => {
    const r = cardEl.getBoundingClientRect();
    const cx = r.left + r.width / 2 - fcRect.left;
    return cx >= col.left - 1 && cx <= col.right + 1;
  });

  const arrows = [];
  const coreqSeen = new Set();
  const router = makeArrowRouter();
  COURSES.forEach((target) => {
    (target.prereqs || []).forEach((src) => {
      const a = buildArrow(src, target.id, fcRect, false, selected, hasSel, colors, geo, colIndexOf, router);
      if (a) arrows.push(a);
    });
    (target.coreqs || []).forEach((src) => {
      const key = [src, target.id].sort().join("|");    // mutual coreqs: draw once
      if (coreqSeen.has(key)) return;
      coreqSeen.add(key);
      const a = buildArrow(src, target.id, fcRect, true, selected, hasSel, colors, geo, colIndexOf, router);
      if (a) arrows.push(a);
    });
  });
  arrows.sort((a, b) => Number(a.lit) - Number(b.lit));
  elements.arrows.innerHTML = defs + arrows.map((a) => a.svg).join("");
}

// Mobile uses semester bands stacked top-to-bottom. This is intentionally a
// separate router from the desktop left-to-right rails: all prerequisite paths
// move downward, while the existing card/header/drag interactions stay intact.
function drawMobileArrows() {
  const fc = elements.flowchart;
  const w = fc.scrollWidth, h = fc.scrollHeight;
  elements.arrows.setAttribute("width", w);
  elements.arrows.setAttribute("height", h);
  elements.arrows.setAttribute("viewBox", `0 0 ${w} ${h}`);
  const fcRect = fc.getBoundingClientRect();
  const selected = state.selectedCourseId;
  const hasSel = Boolean(fc.querySelector(`[data-course-id="${selected}"]`));
  const colors = arrowColors();
  const defs = `<defs>
    <marker id="arrow-prereq" markerWidth="9" markerHeight="9" refX="7.4" refY="4.5" orient="auto"><path d="M.5,1 L8.2,4.5 L.5,8 Z" fill="${colors.prereq}"></path></marker>
    <marker id="arrow-coreq" markerWidth="9" markerHeight="9" refX="7.4" refY="4.5" orient="auto"><path d="M.5,1 L8.2,4.5 L.5,8 Z" fill="${colors.coreq}"></path></marker>
  </defs>`;
  const terms = [...fc.querySelectorAll(".term-column")];
  const termIndex = new Map();
  terms.forEach((term, index) => term.querySelectorAll(".course-card").forEach((card) => termIndex.set(card.dataset.courseId, index)));
  const arrows = [];
  const coreqSeen = new Set();
  let longLane = 0;
  const wrap = (d, coreq, related) => {
    const lit = hasSel ? related : false;
    const color = coreq ? colors.coreq : colors.prereq;
    const opacity = hasSel ? (lit ? 1 : .07) : .92;
    const stroke = hasSel && lit ? 3.4 : 2.25;
    const marker = !hasSel || lit ? ` marker-end="url(#arrow-${coreq ? "coreq" : "prereq"})"` : "";
    const dash = coreq ? ` stroke-dasharray="4 3"` : "";
    return { lit, svg:
      `<path d="${d}" fill="none" stroke="${colors.surface}" stroke-width="${stroke + 4.5}" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"></path>` +
      `<path d="${d}" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="${opacity}" vector-effect="non-scaling-stroke"${dash}${marker}></path>` };
  };
  const mobilePath = (sourceId, targetId, coreq) => {
    const source = fc.querySelector(`[data-course-id="${sourceId}"]`);
    const target = fc.querySelector(`[data-course-id="${targetId}"]`);
    if (!source || !target) return null;
    const sTerm = termIndex.get(sourceId), tTerm = termIndex.get(targetId);
    if (sTerm === undefined || tTerm === undefined) return null;
    if (!coreq && sTerm >= tTerm) return null;
    const s = source.getBoundingClientRect(), targetRect = target.getBoundingClientRect();
    const sx = s.left + s.width / 2 - fcRect.left, sy = s.bottom - fcRect.top;
    const tx = targetRect.left + targetRect.width / 2 - fcRect.left, ty = targetRect.top - fcRect.top;
    if (coreq && sTerm === tTerm) {
      const fromLeft = s.left <= targetRect.left;
      const x1 = (fromLeft ? s.right : s.left) - fcRect.left;
      const x2 = (fromLeft ? targetRect.left : targetRect.right) - fcRect.left;
      const y = (s.top + s.height / 2 - fcRect.top + targetRect.top + targetRect.height / 2 - fcRect.top) / 2;
      return wrap(`M ${x1} ${y} L ${x2} ${y}`, true, sourceId === selected || targetId === selected);
    }
    if (ty <= sy) return null;
    let d;
    if (tTerm - sTerm === 1) {
      const mid = (sy + ty) / 2;
      d = `M ${sx} ${sy} L ${sx} ${mid} L ${tx} ${mid} L ${tx} ${ty}`;
    } else {
      const side = w - 7 - (longLane++ % 3) * 5;
      d = `M ${sx} ${sy} L ${side} ${sy} L ${side} ${ty} L ${tx} ${ty}`;
    }
    return wrap(d, coreq, sourceId === selected || targetId === selected);
  };
  COURSES.forEach((target) => {
    (target.prereqs || []).forEach((source) => {
      const arrow = mobilePath(source, target.id, false);
      if (arrow) arrows.push(arrow);
    });
    (target.coreqs || []).forEach((source) => {
      const key = [source, target.id].sort().join("|");
      if (coreqSeen.has(key)) return;
      coreqSeen.add(key);
      const arrow = mobilePath(source, target.id, true);
      if (arrow) arrows.push(arrow);
    });
  });
  arrows.sort((a, b) => Number(a.lit) - Number(b.lit));
  elements.arrows.innerHTML = defs + arrows.map((arrow) => arrow.svg).join("");
}

// The router claims actual ports, vertical gutter lanes and horizontal rails.
// An arrow therefore never reuses a segment that another visible arrow owns.
function makeArrowRouter() {
  return { gutters: new Map(), ports: new Map(), rails: [] };
}

function laneOffset(index, spacing = 10) {
  if (index === 0) return 0;
  const n = Math.ceil(index / 2);
  return (index % 2 ? -1 : 1) * n * spacing;
}

function claimPortY(card, side, rect, fcRect, router) {
  const key = `${card.dataset.courseId}:${side}`;
  const used = router.ports.get(key) || 0;
  router.ports.set(key, used + 1);
  const center = rect.top + rect.height / 2 - fcRect.top;
  const low = rect.top - fcRect.top + 14;
  const high = rect.bottom - fcRect.top - 14;
  return Math.max(low, Math.min(high, center + laneOffset(used, 9)));
}

function claimGutterX(geo, leftCol, rightCol, router) {
  const left = geo.cols[leftCol];
  const right = geo.cols[rightCol];
  if (!left || !right) return 0;
  const key = `${leftCol}:${rightCol}`;
  const used = router.gutters.get(key) || 0;
  router.gutters.set(key, used + 1);
  const gap = Math.max(1, right.left - left.right);
  const inset = Math.max(2, Math.min(8, gap * .25));
  const low = left.right + inset;
  const high = right.left - inset;
  const center = (left.right + right.left) / 2;
  const spacing = Math.max(2, Math.min(9, Math.max(2, high - low) / 2));
  return high <= low ? center : Math.max(low, Math.min(high, center + laneOffset(used, spacing)));
}

function corridorIsClear(geo, fromCol, toCol, y) {
  if (y < geo.headerFloor || y > geo.routeBottom) return false;
  const between = geo.cols.slice(Math.min(fromCol, toCol) + 1, Math.max(fromCol, toCol));
  return !between.some((col) => col.cards.some((c2) => y > c2.top - 6 && y < c2.bottom + 6));
}

function claimCorridorY(geo, fromCol, toCol, desiredY, router) {
  const overlapsExistingRail = (y) => router.rails.some((rail) =>
    rail.from < toCol && fromCol < rail.to && Math.abs(rail.y - y) < 12);
  const offsets = [0];
  for (let off = 12; off <= 720; off += 12) offsets.push(-off, off);
  for (const off of offsets) {
    const y = desiredY + off;
    if (corridorIsClear(geo, fromCol, toCol, y) && !overlapsExistingRail(y)) {
      router.rails.push({ from: fromCol, to: toCol, y });
      return y;
    }
  }
  // Compact overview layouts may not have enough unique 12px rails. Keep the
  // connector visible in a tight bottom routing band instead of dropping it.
  const fallback = Math.max(geo.headerFloor, geo.routeBottom - (router.rails.length % 8) * 5);
  router.rails.push({ from: fromCol, to: toCol, y: fallback });
  return fallback;
}

// Orthogonal USF-style routing with rounded elbows; arrows travel through
// separately claimed column gutters and between-card corridors only.
function buildArrow(srcId, tgtId, fcRect, coreq, selected, hasSel, colors, geo, colIndexOf, router) {
  const source = elements.flowchart.querySelector(`[data-course-id="${srcId}"]`);
  const target = elements.flowchart.querySelector(`[data-course-id="${tgtId}"]`);
  if (!source || !target) return null;
  const s = source.getBoundingClientRect();
  const tt = target.getBoundingClientRect();
  const sCol = colIndexOf(source), tCol = colIndexOf(target);
  if (sCol < 0 || tCol < 0) return null;
  // A co-requisite is a two-way relationship: orient its one visual connector
  // left-to-right. A prerequisite with this geometry is invalid and omitted.
  if (coreq && sCol > tCol) {
    return buildArrow(tgtId, srcId, fcRect, coreq, selected, hasSel, colors, geo, colIndexOf, router);
  }
  if (!coreq && sCol >= tCol) return null;

  const related = srcId === selected || tgtId === selected;
  const lit = hasSel ? related : false;
  const color = coreq ? colors.coreq : colors.prereq;
  const dash = coreq ? ` stroke-dasharray="6 5"` : "";
  let opacity, stroke, marker;
  if (!hasSel) { opacity = 0.8; stroke = 2.1; marker = ` marker-end="url(#arrow-${coreq ? "coreq" : "prereq"})"`; }
  else if (lit) { opacity = 1; stroke = 3; marker = ` marker-end="url(#arrow-${coreq ? "coreq" : "prereq"})"`; }
  else { opacity = 0.08; stroke = 1.3; marker = ""; }
  // The surface-coloured underlay creates a small bridge at crossings. Since
  // no two routes share a claimed lane, a crossing cannot be mistaken for a
  // branch or a merged arrow.
  const wrap = (d) => ({ svg:
    `<path d="${d}" fill="none" stroke="${colors.surface}" stroke-width="${stroke + 4}" stroke-linecap="round" stroke-linejoin="round"></path>` +
    `<path d="${d}" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="${opacity}"${dash}${marker}></path>`, lit });

  // Same column (typically coreqs like حلقة بحث + تربية عملية): a short
  // straight connector between the two cards, like the USF chart.
  if (sCol === tCol && sCol !== -1) {
    const upper = s.top <= tt.top ? s : tt;
    const lower = s.top <= tt.top ? tt : s;
    const x = (Math.max(s.left, tt.left) + Math.min(s.right, tt.right)) / 2 - fcRect.left;
    const yA = upper.bottom - fcRect.top + 1;
    const yB = lower.top - fcRect.top - 1;
    return wrap(`M ${x} ${yA} L ${x} ${yB}`);
  }

  const x1 = s.right - fcRect.left;
  const y1 = claimPortY(source, "out", s, fcRect, router);
  const x2 = tt.left - fcRect.left;
  const y2 = claimPortY(target, "in", tt, fcRect, router);

  if (x2 - x1 > 4) {
    const r = 8;
    if (tCol - sCol <= 1) {
      // Adjacent columns: each connector claims its own lane in the shared gutter.
      const gx = claimGutterX(geo, sCol, tCol, router);
      if (Math.abs(y2 - y1) < 1) return wrap(`M ${x1} ${y1} L ${x2} ${y2}`);
      const sy = y2 > y1 ? 1 : -1;
      const rr = Math.min(r, Math.abs(y2 - y1) / 2);
      return wrap(`M ${x1} ${y1} L ${gx - rr} ${y1} Q ${gx} ${y1} ${gx} ${y1 + rr * sy} L ${gx} ${y2 - rr * sy} Q ${gx} ${y2} ${gx + rr} ${y2} L ${x2} ${y2}`);
    }
    // Multi-column span: independently claimed source/target gutters plus a
    // claimed horizontal rail. This prevents merged rails at intersections.
    const gxA = claimGutterX(geo, sCol, sCol + 1, router);
    const gxB = claimGutterX(geo, tCol - 1, tCol, router);
    const cy = claimCorridorY(geo, sCol, tCol, (y1 + y2) / 2, router);
    if (cy === null) return null;
    const s1 = cy > y1 ? 1 : -1;
    const s2 = y2 > cy ? 1 : -1;
    const r1 = Math.min(r, Math.abs(cy - y1) / 2);
    const r2 = Math.min(r, Math.abs(y2 - cy) / 2);
    if (Math.abs(cy - y1) < 6 && Math.abs(y2 - cy) < 6) return wrap(`M ${x1} ${y1} L ${x2} ${y2}`);
    return wrap(
      `M ${x1} ${y1} L ${gxA - r1} ${y1} Q ${gxA} ${y1} ${gxA} ${y1 + r1 * s1}` +
      ` L ${gxA} ${cy - r1 * s1} Q ${gxA} ${cy} ${gxA + r1} ${cy}` +
      ` L ${gxB - r2} ${cy} Q ${gxB} ${cy} ${gxB} ${cy + r2 * s2}` +
      ` L ${gxB} ${y2 - r2 * s2} Q ${gxB} ${y2} ${gxB + r2} ${y2}` +
      ` L ${x2} ${y2}`
    );
  }
  return null;
}

// ---------- completed toggling ----------
function toggleCompleted(id) {
  if (state.completed.has(id)) state.completed.delete(id);
  else {
    state.completed.add(id);
    state.completedMeta[id] = state.completedMeta[id] || { term: state.lang === "ar" ? "محدد يدويًا" : "Manual", grade: "" };
  }
  saveState();
  renderAll();
}

function applyTranscriptRecords(records, stats) {
  state.completed = new Set();
  state.completedMeta = {};
  state.electiveSelections = {};
  records.forEach((rec) => {
    if (!courseById.has(rec.courseId)) return;
    state.completed.add(rec.courseId);
    state.completedMeta[rec.courseId] = { term: rec.term, grade: rec.grade, electiveChoiceId: rec.electiveChoiceId };
    if (rec.electiveChoiceId) state.electiveSelections[rec.courseId] = rec.electiveChoiceId;
  });
  // New transcript = new reality: drop manual pins and regenerate the plan
  // (past terms from the record, future terms auto-scheduled).
  state.futureSems = null;
  state.placements = {};
  state.scanStats = stats;
  if (!stats) elements.scanStatus.textContent = state.lang === "ar"
    ? "تم تطبيق السجل التجريبي (24 مقررًا، 72 وحدة)."
    : "Sample record applied (24 courses, 72 credits).";
  saveState();
  renderAll();
}

// ---------- helpers ----------
function getCourseStatus(course) {
  if (state.completed.has(course.id)) return { label: t("tabComplete"), className: "complete" };
  if (state.sections.some((it) => it.courseId === course.id)) return { label: t("tabPlanned"), className: "" };
  if (course.elective) return { label: t("tabElective"), className: "elective" };
  return isUnlocked(course) ? { label: t("tabAvailable"), className: "" } : { label: t("tabLocked"), className: "locked" };
}

function formatCourseCode(course) {
  if (!course) return "";
  return course.elective ? t("tabElective") : `${course.subj.slice(2)} ${course.num}`;
}

function formatCourseShort(id) {
  const course = courseById.get(id);
  return course ? `${formatCourseCode(course)} ${course.title}` : id;
}

function formatDays(days) {
  return (days || []).map((id) => { const d = DAYS.find((x) => x.id === id); return d ? d[state.lang] : id; }).join("، ");
}

function debounce(fn, wait) {
  let t2;
  return (...a) => { clearTimeout(t2); t2 = setTimeout(() => fn(...a), wait); };
}

/* ============================================================
   Study-plan (الخطة الدراسية) scanner
   - OCR the eadvisor Major-Sheet screenshot.
   - Match each catalog course by name (read count).
   - Detect the green ✓ next to passed courses by sampling pixels.
   ============================================================ */
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  clearScanReview();
  elements.preview.src = URL.createObjectURL(file);
  elements.preview.hidden = false;
  elements.scanStatus.textContent = (state.lang === "ar" ? "تم رفع " : "Uploaded ") + file.name;
}

let scanRun = 0; // bumped by resetPlanner to cancel in-flight scans

async function scanPlanImage() {
  const file = elements.fileInput.files[0];
  if (!file) { elements.scanStatus.textContent = t("noUpload"); return; }
  if (!window.Tesseract) {
    elements.scanStatus.textContent = state.lang === "ar"
      ? "تعذر تحميل محرك القراءة. تأكد من الاتصال بالإنترنت."
      : "OCR engine failed to load. Check your connection.";
    return;
  }
  const run = ++scanRun;
  elements.scanButton.disabled = true;
  const img = await loadImage(file);
  try {
    // Keep one full-resolution color canvas for table/check detection, but OCR
    // it in overlapping strips. Mobile browsers are far more reliable when
    // Tesseract never has to hold a second full-page canvas in memory.
    const { color } = preprocessForOcr(img);
    const data = await recognizeCanvasRegion(color, 0, color.height, run);
    if (run !== scanRun) return; // user pressed Clear while OCR was running
    const detectedMode = detectScanMode(data.text);
    const mode = detectedMode || state.scanMode;
    const parsed = mode === "transcript"
      ? parseTranscript(data)
      : await parsePlanWithTableBlocks(data, color, run);
    if (run !== scanRun) return;
    showScanReview(parsed, mode);
    elements.scanStatus.textContent = state.lang === "ar"
      ? `تمت قراءة ${parsed.stats.read} من ${parsed.stats.expected} مقررًا.`
      : `Read ${parsed.stats.read} of ${parsed.stats.expected} courses.`;
    elements.scanStatus.textContent = t("scanReady");
  } catch (err) {
    elements.scanStatus.textContent = (state.lang === "ar" ? "تعذرت القراءة: " : "Scan failed: ") + err;
  } finally {
    elements.scanButton.disabled = false;
  }
}

function clearScanReview() {
  state.pendingScan = null;
  if (!elements.scanReview) return;
  elements.scanReview.hidden = true;
  elements.scanReview.innerHTML = "";
}

function showScanReview(parsed, mode) {
  const records = (parsed.records || []).filter((record) => courseById.has(record.courseId));
  state.pendingScan = { records, stats: parsed.stats || null, mode };
  if (!elements.scanReview) return;
  const rows = records.map((record, index) => {
    const course = courseById.get(record.courseId);
    const choice = course.elective && record.electiveChoiceId
      ? (getElectiveOptions(course.id).find((item) => item.id === record.electiveChoiceId) || {}) : null;
    const title = choice?.title || course.title;
    const detail = [formatCourseCode(course), record.grade, record.term].filter(Boolean).join(" · ");
    return `<label class="scan-review-row"><input type="checkbox" data-scan-record="${index}" checked><span><strong>${title}</strong><span>${detail}</span></span></label>`;
  });

  elements.scanReview.innerHTML = `
    <h3>${t("reviewScan")} (${records.length} ${t("detectedCourses")})</h3>
    <p>${t("reviewScanHint")}</p>
    <div class="scan-review-list">${rows || `<p>${t("none")}</p>`}</div>
    <div class="scan-review-actions">
      <button type="button" id="apply-scan-review">${t("applyScan")}</button>
      <button type="button" class="ghost-button" id="cancel-scan-review">${t("cancelScan")}</button>
    </div>`;
  elements.scanReview.hidden = false;
  elements.scanReview.querySelector("#apply-scan-review").addEventListener("click", () => {
    const selected = [...elements.scanReview.querySelectorAll("[data-scan-record]:checked")]
      .map((box) => records[Number(box.dataset.scanRecord)]).filter(Boolean);
    applyTranscriptRecords(selected, parsed.stats || null);
    clearScanReview();
  });
  elements.scanReview.querySelector("#cancel-scan-review").addEventListener("click", () => {
    clearScanReview();
    elements.scanStatus.textContent = t("noUpload");
  });
}

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const im = new Image();
    im.onload = () => resolve(im);
    im.onerror = reject;
    im.src = URL.createObjectURL(file);
  });
}

// Upscale narrow screenshots while keeping the persistent canvas bounded on
// phones. OCR canvases are created one strip at a time by recognizeCanvasRegion.
function preprocessForOcr(img) {
  const w = img.naturalWidth || img.width;
  const h = img.naturalHeight || img.height;
  const mobile = window.matchMedia("(max-width: 620px)").matches;
  const targetWidth = mobile ? 1800 : 1600;
  let scale = Math.max(1, Math.min(3, targetWidth / w));
  const MAX_AREA = mobile ? 24e6 : 40e6;
  if (w * scale * h * scale > MAX_AREA) scale = Math.max(1, Math.sqrt(MAX_AREA / (w * h)));
  const cw = Math.round(w * scale), ch = Math.round(h * scale);
  const color = document.createElement("canvas");
  color.width = cw; color.height = ch;
  const cctx = color.getContext("2d", { willReadFrequently: true });
  cctx.imageSmoothingEnabled = true;
  cctx.imageSmoothingQuality = "high";
  cctx.drawImage(img, 0, 0, cw, ch);
  return { color, scale };
}

function createOcrStrip(colorCanvas, top, bottom) {
  const ocr = document.createElement("canvas");
  ocr.width = colorCanvas.width;
  ocr.height = Math.max(1, bottom - top);
  const octx = ocr.getContext("2d");
  octx.imageSmoothingEnabled = true;
  octx.imageSmoothingQuality = "high";
  octx.filter = "grayscale(1) contrast(1.65)";
  octx.drawImage(colorCanvas, 0, top, colorCanvas.width, ocr.height, 0, 0, ocr.width, ocr.height);
  return ocr;
}

// OCR a full page or table region as sequential overlapping strips. Offsets
// remain relative to the requested region so callers can merge table results
// back into the full-page coordinate system used by green-check detection.
async function recognizeCanvasRegion(colorCanvas, top, bottom, run, label = "") {
  const mobile = window.matchMedia("(max-width: 620px)").matches;
  const regionHeight = Math.max(1, bottom - top);
  const tileHeight = mobile ? 1350 : 2100;
  const overlap = mobile ? 180 : 140;
  const starts = [];
  if (regionHeight <= tileHeight) starts.push(0);
  else {
    for (let y = 0; y < regionHeight; y += tileHeight - overlap) {
      starts.push(Math.min(y, Math.max(0, regionHeight - tileHeight)));
      if (starts[starts.length - 1] + tileHeight >= regionHeight) break;
    }
  }
  const scanned = [];
  for (let index = 0; index < starts.length; index++) {
    if (run !== scanRun) return { text: "", lines: [] };
    const relativeTop = starts[index];
    const relativeBottom = Math.min(regionHeight, relativeTop + tileHeight);
    const strip = createOcrStrip(colorCanvas, top + relativeTop, top + relativeBottom);
    const result = await window.Tesseract.recognize(strip, "ara+eng", {
      logger: (m) => {
        if (m.status !== "recognizing text" || run !== scanRun) return;
        const progress = Math.round(((index + m.progress) / starts.length) * 100);
        const prefix = label || (state.lang === "ar" ? "جاري القراءة" : "Reading");
        elements.scanStatus.textContent = `${prefix}... ${progress}%`;
      }
    });
    scanned.push({ data: result.data, offset: relativeTop });
    strip.width = 1; strip.height = 1;
  }
  return mergeOcrData({ text: "", lines: [] }, scanned);
}

function detectScanMode(text) {
  const normalized = normalizeArabic(text || "");
  const transcript = normalizeArabic("\u0627\u0644\u0633\u062c\u0644 \u0627\u0644\u062f\u0631\u0627\u0633\u064a");
  return normalized.includes(transcript) ? "transcript" : "";
}

// Find wide burgundy table headers, then OCR each full table independently.
// This works for uncropped, long mobile screenshots because each table gets a
// clean, high-resolution OCR pass instead of competing with the whole page.
function findTableBlocks(canvas) {
  const { width, height } = canvas;
  const probeScale = Math.min(1, 520 / width);
  const probe = document.createElement("canvas");
  probe.width = Math.max(1, Math.round(width * probeScale));
  probe.height = Math.max(1, Math.round(height * probeScale));
  const ctx = probe.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(canvas, 0, 0, probe.width, probe.height);
  const pixels = ctx.getImageData(0, 0, probe.width, probe.height).data;
  const bands = [];
  let start = -1;
  for (let y = 0; y < probe.height; y += 1) {
    let red = 0;
    for (let x = Math.floor(probe.width * .04); x < Math.floor(probe.width * .96); x += 1) {
      const i = (y * probe.width + x) * 4;
      const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
      if (r > 115 && r > g * 1.55 && r > b * 1.55 && g < 125) red++;
    }
    const wideRed = red > probe.width * .075;
    if (wideRed && start < 0) start = y;
    if (!wideRed && start >= 0) {
      if (y - start >= 2) bands.push({ top: start / probeScale, bottom: y / probeScale });
      start = -1;
    }
  }
  if (start >= 0) bands.push({ top: start / probeScale, bottom: height });
  probe.width = 1; probe.height = 1;
  return bands.map((band, index) => ({
    top: Math.max(0, band.top - 22),
    bottom: index + 1 < bands.length ? Math.max(band.bottom + 30, bands[index + 1].top - 22) : height
  })).filter((block) => block.bottom - block.top >= 80).slice(0, 10);
}

function mergeOcrData(fullData, blocks) {
  const lines = [...(fullData.lines || [])];
  const texts = [fullData.text || ""];
  blocks.forEach(({ data, offset }) => {
    texts.push(data.text || "");
    (data.lines || []).forEach((line) => {
      const box = line.bbox || {};
      lines.push({ ...line, bbox: { ...box, y0: (box.y0 || 0) + offset, y1: (box.y1 || 0) + offset } });
    });
  });
  return { text: texts.join("\n"), lines };
}

async function parsePlanWithTableBlocks(fullData, colorCanvas, run) {
  const blocks = findTableBlocks(colorCanvas);
  if (!blocks.length) return parsePlan(fullData, colorCanvas);
  const scanned = [];
  for (let index = 0; index < blocks.length; index++) {
    if (run !== scanRun) return { records: [], stats: { read: 0, expected: COURSES.length, passed: 0, unread: [] } };
    elements.scanStatus.textContent = `${state.lang === "ar" ? "\u062c\u0627\u0631\u064a \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u062c\u062f\u0648\u0644" : "Reading table"} ${index + 1}/${blocks.length}`;
    const block = blocks[index];
    const data = await recognizeCanvasRegion(
      colorCanvas,
      block.top,
      block.bottom,
      run,
      `${state.lang === "ar" ? "جاري قراءة الجدول" : "Reading table"} ${index + 1}/${blocks.length}`
    );
    scanned.push({ data, offset: block.top });
  }
  return parsePlan(mergeOcrData(fullData, scanned), colorCanvas);
}

// Normalize Arabic for fuzzy matching.
function normalizeArabic(v) {
  return String(v)
    .replace(/[ً-ْٰ]/g, "").replace(/ـ/g, "")
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[أإآٱ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي").replace(/[ؤئء]/g, "")
    .replace(/[^؀-ۿa-zA-Z0-9\s]/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
}
// Bounded edit distance (early-exit); returns max+1 when distance exceeds max.
function editDistance(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_x, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      if (cur[j] < rowMin) rowMin = cur[j];
    }
    if (rowMin > max) return max + 1;
    prev = cur;
  }
  return prev[b.length];
}

// OCR-tolerant: a title token counts as present if some word on the line
// equals it, contains it (len>=3), or is within a small edit distance.
function tokenOnLine(lineWords, tok) {
  const tol = tok.length >= 7 ? 2 : tok.length >= 4 ? 1 : 0;
  for (const w of lineWords) {
    if (w === tok) return true;
    if (tok.length >= 3 && (w.includes(tok) || tok.includes(w) && w.length >= 3)) return true;
    if (tol && editDistance(w, tok, tol) <= tol) return true;
  }
  return false;
}

function titleCoverage(lineNorm, titleNorm) {
  // keep 1-char digit tokens: they distinguish e.g. حاسوب (1) from حاسوب (2)
  const toks = titleNorm.split(" ").filter((x) => x.length >= 2 || /\d/.test(x));
  if (!toks.length) return 0;
  const lineWords = lineNorm.split(" ");
  let hit = 0; toks.forEach((tk) => { if (tokenOnLine(lineWords, tk)) hit++; });
  // tiny per-matched-token bonus so the more specific title wins ties
  // (e.g. "مناهج البحث" must beat "المناهج" on a مناهج البحث row)
  return hit / toks.length + hit * 0.01;
}

// Detect a term-header line like "الفصل الأول 2023-2024".
function detectTerm(line) {
  const norm = normalizeArabic(line);
  if (!/الفصل/.test(norm)) return null;
  const years = norm.match(/(20\d{2})\s*[-\s]\s*(20\d{2})/);
  const which = /الاول/.test(norm) ? "الأول"
    : /الثاني/.test(norm) ? "الثاني"
    : /الصيفي|صيف/.test(norm) ? "الصيفي" : "";
  if (!which && !years) return null;
  return `الفصل ${which}${years ? " " + years[1] + "-" + years[2] : ""}`.trim();
}

function extractGrade(line) {
  // \b fails after +/- so match explicitly; RTL OCR can also emit "+B" for "B+".
  const m = String(line).match(/(?:^|[^A-Za-z])(?:([+\-])\s?)?([A-DF])(?:\s?([+\-]))?(?![A-Za-z])/);
  return m ? m[2] + (m[3] || m[1] || "") : "";
}

// A grade letter proves the row is a course row. OCR often destroys ONE word
// of a short Arabic title (e.g. الجبر الخطى -> "yall الخطي A"), leaving 0.5
// coverage. Accept such rows when the best candidate clearly dominates every
// DIFFERENT title (twin elective slots share titles, so ties on the same
// title don't count as ambiguity).
function dominates(bestScore, secondScore) {
  return bestScore >= 0.3 && bestScore - secondScore >= 0.25;
}

// Best-matching elective option on a line -> {slotId, optionId, title}.
// `taken` lets twin slots (EL-GEN-1/2 share one options list) fill in order.
function matchElectiveInLine(lineNorm, taken, hasGrade) {
  let best = null, bestScore = 0, bestTitleNorm = "", secondScore = 0;
  Object.entries(ELECTIVE_OPTIONS).forEach(([slotId, opts]) => {
    if (taken && taken.has(slotId)) return;
    opts.forEach((o) => {
      const tn = normalizeArabic(o.title);
      const sc = titleCoverage(lineNorm, tn);
      if (sc > bestScore) {
        if (bestTitleNorm && bestTitleNorm !== tn) secondScore = bestScore;
        bestScore = sc; best = { slotId, optionId: o.id, title: o.title }; bestTitleNorm = tn;
      } else if (sc > secondScore && tn !== bestTitleNorm) {
        secondScore = sc;
      }
    });
  });
  if (!best) return null;
  if (bestScore >= 0.8) return { ...best, score: bestScore };
  if (hasGrade && dominates(bestScore, secondScore)) return { ...best, score: bestScore };
  return null;
}

// Completion icons are in the rightmost part of PAAET plan rows. Record their
// vertical centres before OCR association so an OCR box does not need to cover
// the icon itself.
function findGreenCheckMarkers(ctx, imgWidth, imgHeight) {
  try {
    const startX = Math.floor(imgWidth * .7);
    const markerWidth = imgWidth - startX;
    const scale = Math.min(1, 320 / markerWidth, 7000 / imgHeight);
    const probe = document.createElement("canvas");
    probe.width = Math.max(1, Math.round(markerWidth * scale));
    probe.height = Math.max(1, Math.round(imgHeight * scale));
    const pctx = probe.getContext("2d", { willReadFrequently: true });
    pctx.drawImage(ctx.canvas, startX, 0, markerWidth, imgHeight, 0, 0, probe.width, probe.height);
    const pixels = pctx.getImageData(0, 0, probe.width, probe.height).data;
    const bands = [];
    let active = null;
    for (let y = 0; y < probe.height; y++) {
      let green = 0;
      for (let x = 0; x < probe.width; x++) {
        const i = (y * probe.width + x) * 4;
        const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
        if (g > 70 && g > r * 1.25 && g > b * 1.2) green++;
      }
      if (green >= Math.max(1, Math.round(3 * scale))) {
        if (active) active.bottom = y;
        else active = { top: y, bottom: y };
      } else if (active) {
        bands.push(active); active = null;
      }
    }
    if (active) bands.push(active);
    const markers = bands.filter((band) => band.bottom - band.top >= Math.max(1, 2 * scale) && band.bottom - band.top <= 80 * scale)
      .map((band) => ((band.top + band.bottom) / 2) / scale);
    probe.width = 1; probe.height = 1;
    return markers;
  } catch { return []; }
}

// Detect the green check mark within/near a text line's bounding box.
function hasGreenCheck(ctx, bbox, imgWidth, markers = []) {
  try {
    const center = ((bbox.y0 || 0) + (bbox.y1 || 0)) / 2;
    const tolerance = Math.max(18, ((bbox.y1 || 0) - (bbox.y0 || 0)) * 1.3);
    if (markers.some((y) => Math.abs(y - center) <= tolerance)) return true;
    // Scan the whole row: the only green in a table row is the ✓ (pass) icon.
    const pad = 5;
    const x0 = Math.max(0, bbox.x0 - pad);
    const x1 = Math.min(imgWidth, bbox.x1 + pad);
    const y0 = Math.max(0, bbox.y0 - pad);
    const w = x1 - x0;
    const h = (bbox.y1 - bbox.y0) + pad * 2;
    if (w <= 1 || h <= 1) return false;
    const data = ctx.getImageData(x0, y0, w, h).data;
    let green = 0;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      if (g > 80 && r < 200 && g > r * 1.25 && g > b * 1.2) green++;
    }
    return green >= 5;
  } catch { return false; }
}

function parsePlan(data, img) {
  const isCanvas = img instanceof HTMLCanvasElement;
  const canvas = isCanvas ? img : document.createElement("canvas");
  if (!isCanvas) {
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;
    canvas.getContext("2d", { willReadFrequently: true }).drawImage(img, 0, 0);
  }
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const greenMarkers = findGreenCheckMarkers(ctx, canvas.width, canvas.height);

  const lines = (data.lines || []).map((ln) => ({
    raw: ln.text || "",
    norm: normalizeArabic(ln.text || ""),
    bbox: ln.bbox || { x0: 0, y0: 0, x1: 0, y1: 0 }
  }));
  const wholeNorm = normalizeArabic(data.text || "");

  const hasTok = (line, s) => s && new RegExp(`(?:^|\\s)${s}(?:\\s|$)`).test(line);

  // Targets carry number + 2-digit dept for reliable digit-based matching.
  const reqTargets = COURSES.filter((c2) => !c2.elective).map((c2) => ({
    key: c2.id, num: c2.num, dept2: c2.subj.slice(2), titles: c2.aliases.map(normalizeArabic)
  }));
  const elecTargets = [];
  Object.entries(ELECTIVE_OPTIONS).forEach(([slot, opts]) => {
    opts.forEach((o) => elecTargets.push({
      key: `${slot}::${o.id}`, num: o.num, dept2: o.subj.slice(2), titles: [normalizeArabic(o.title)]
    }));
  });
  const targets = [...reqTargets, ...elecTargets];

  const matched = new Map(); // key -> {passed}
  lines.forEach((line) => {
    if (line.norm.replace(/\s/g, "").length < 3) return;
    const grade = extractGrade(line.raw);            // grade column => passed
    let best = null, bestScore = 0;
    // Dominance is judged among REQUIRED titles only: a half-destroyed
    // required row (e.g. "الخطي" from الجبر الخطى) can tie an elective title
    // (البرمجه الخطيه) on the shared token, and required must win that tie.
    let bestReq = null, reqScore = 0, reqSecond = 0;
    targets.forEach((tgt) => {
      let sc = 0;
      tgt.titles.forEach((tn) => { const v = titleCoverage(line.norm, tn); if (v > sc) sc = v; });
      // number + department code present on the row => definitive match
      if (hasTok(line.norm, tgt.num) && hasTok(line.norm, tgt.dept2)) sc = Math.max(sc, 1.2);
      if (sc > bestScore) { bestScore = sc; best = tgt.key; }
      if (!tgt.key.includes("::")) {
        if (sc > reqScore) { reqSecond = reqScore; reqScore = sc; bestReq = tgt.key; }
        else if (sc > reqSecond) { reqSecond = sc; }
      }
    });
    // A grade letter proves this is a course row, so tolerate weaker Arabic
    // OCR there (same trick as parseTranscript).
    let hit = null;
    if (best && bestScore >= (grade ? 0.6 : 0.72)) hit = best;
    else if (grade && bestReq && dominates(reqScore, reqSecond)) hit = bestReq;
    if (hit) {
      const passed = Boolean(grade) || hasGreenCheck(ctx, line.bbox, canvas.width, greenMarkers);
      const prev = matched.get(hit);
      if (!prev || (!prev.passed && passed)) matched.set(hit, { passed, grade });
    }
  });

  // Whole-text fallback if line segmentation was poor.
  if ([...matched.keys()].filter((k) => !k.includes("::")).length < 5) {
    reqTargets.forEach((tgt) => {
      if (matched.has(tgt.key)) return;
      if (tgt.titles.some((tn) => wholeNorm.includes(tn))) matched.set(tgt.key, { passed: false });
    });
  }

  const records = [];
  const usedSlots = new Set();
  matched.forEach((info, key) => {
    if (!info.passed) return;
    if (key.includes("::")) {
      let [slot, optId] = key.split("::");
      if (usedSlots.has(slot)) {
        // twin slots (EL-GEN-1/2, EL-MAJ-1/2) share one options list — spill
        // a second passed elective into the next free slot offering it
        const alt = Object.keys(ELECTIVE_OPTIONS).find((s2) =>
          !usedSlots.has(s2) && ELECTIVE_OPTIONS[s2].some((o) => o.id === optId));
        if (!alt) return;
        slot = alt;
      }
      usedSlots.add(slot);
      records.push({ courseId: slot, term: "", grade: info.grade || "", electiveChoiceId: optId });
    } else {
      records.push({ courseId: key, term: "", grade: info.grade || "" });
    }
  });

  const readIds = new Set();
  matched.forEach((_v, key) => readIds.add(key.includes("::") ? key.split("::")[0] : key));
  const unread = COURSES.filter((c2) => !c2.elective && !readIds.has(c2.id)).map((c2) => c2.title);

  return {
    records,
    stats: { read: readIds.size, expected: COURSES.length, passed: records.length, unread: unread.slice(0, 12) }
  };
}

/* Transcript (السجل الدراسي) parser: term headers + course names + grades.
   Any course listed here is a completed (passed) course. */
function parseTranscript(data) {
  const lines = (data.lines || []).map((ln) => ({ raw: ln.text || "", norm: normalizeArabic(ln.text || "") }));
  const reqTargets = COURSES.filter((c2) => !c2.elective).map((c2) => ({ id: c2.id, titles: c2.aliases.map(normalizeArabic) }));
  const records = [];
  const taken = new Set();
  const unreadRaw = [];
  let term = "";
  let courseRows = 0;
  // Summary/header rows only. Standalone-word forms so course titles survive
  // (e.g. نظم قواعد البيانات must NOT be skipped by a bare البيانات pattern).
  const SKIP = /فصلي|تخصصي|(^|\s)عام(\s|$)|النقاط|المعدل|المجتاز|المسجل|حالات دراسيه|الحالات الدراسيه|اسم المقرر|(^|\s)الدرجه(\s|$)|اختبار|المقابل|البيانات الاكاديم|السجل الدرا|مرشد|لكترون|التطبيقي والتدريب/;

  const bestRequired = (norm, exclude) => {
    let best = null, score = 0, second = 0;
    reqTargets.forEach(({ id, titles }) => {
      if (exclude.has(id)) return;
      let s = 0; titles.forEach((tn) => { const v = titleCoverage(norm, tn); if (v > s) s = v; });
      if (s > score) { second = score; score = s; best = id; }
      else if (s > second) { second = s; }
    });
    return { best, score, second };
  };

  // Match one normalized row; a grade letter proves it's a course row, so the
  // fuzzy threshold can be lower there without risking summary/header rows —
  // and a clearly-dominant partial match is accepted (OCR often destroys one
  // word of a two-word title, e.g. الجبر الخطى).
  const matchRow = (norm, grade) => {
    const minReq = grade ? 0.6 : 0.72;
    const { best, score, second } = bestRequired(norm, taken);
    const reqOk = best && (score >= minReq || (grade && dominates(score, second)));
    const elec = matchElectiveInLine(norm, taken, Boolean(grade));
    // Strong electives (>=0.8) outrank moderate required matches, but a
    // dominance-level elective must actually beat the required score —
    // required wins ties (e.g. "الخطي" = الجبر الخطى, not البرمجه الخطيه).
    const elecWins = elec && !taken.has(elec.slotId) &&
      (elec.score >= 0.8 ? score < 0.99 : !reqOk || elec.score > score);
    if (reqOk && !elecWins) return { courseId: best };
    if (elecWins) return { courseId: elec.slotId, electiveChoiceId: elec.optionId };
    return null;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const th = detectTerm(line.raw);
    if (th) { term = th; continue; }
    const letters = line.norm.replace(/[0-9\s]/g, "");
    if (letters.length < 3 || SKIP.test(line.norm)) continue;
    let grade = extractGrade(line.raw);

    let hit = matchRow(line.norm, grade);
    // OCR sometimes splits one table row into two lines — retry merged with the
    // next non-header line before giving up on this row.
    if (!hit && lines[i + 1] && !detectTerm(lines[i + 1].raw) && !SKIP.test(lines[i + 1].norm)) {
      const mergedNorm = `${line.norm} ${lines[i + 1].norm}`.trim();
      const mergedGrade = grade || extractGrade(lines[i + 1].raw);
      hit = matchRow(mergedNorm, mergedGrade);
      if (hit) { grade = mergedGrade; i++; }
    }

    if (hit && !taken.has(hit.courseId)) {
      taken.add(hit.courseId);
      records.push({ courseId: hit.courseId, term, grade, ...(hit.electiveChoiceId ? { electiveChoiceId: hit.electiveChoiceId } : {}) });
      courseRows++;
    } else if (!hit && (grade || letters.length >= 6)) {
      courseRows++; unreadRaw.push(line.raw.trim());
    }
  }

  return {
    records,
    stats: { read: records.length, expected: courseRows || records.length, passed: records.length, unread: unreadRaw.slice(0, 12) }
  };
}
