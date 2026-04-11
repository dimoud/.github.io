/* ═══════════════════════════════════════════════════════════════
   LANGUAGE DATA
═══════════════════════════════════════════════════════════════ */
const EXP_YEARS = new Date().getFullYear() - 2019;

const LANG = {
  el: {
    nav_about:'Σχετικά', nav_projects:'Έργα', nav_software:'Λογισμικό',
    nav_webdesign:'Web Design', nav_3dprint:'3D Print', nav_experience:'Ομάδα', nav_contact:'Επικοινωνία',
    hero_tag:'// Μηχανολογικό Studio — Αθήνα',
    hero_title:'Μηχανολογικός Σχεδιασμός · 3D Printing · Laser Cut & Engrave',
    hero_desc:'Η <strong>Expertease Designs</strong> είναι studio μηχανολογικού σχεδιασμού και 3D printing — από την ιδέα ως την κατασκευή.',
    hero_cta_work:'Δείτε τα Έργα →', hero_cta_contact:'Επικοινωνήστε',
    stat_years:'Χρόνια Εμπειρίας', stat_projects:'Παραδοθέντα Έργα', stat_degrees:'Μεταπτυχιακά',
    edu_strip:'Ιδρυτής — Δημήτριος Μουδιώτης · 5 Πανεπιστήμια, 3 Χώρες',
    edu1_deg:'Dipl.-Ing.', edu1_name:'Μηχανολόγος Μηχανικός',
    edu2_deg:'MSc General Engineering', edu2_name:'École Centrale Paris',
    edu3_deg:'MSc Powertrain Engineering', edu3_name:'IFP School',
    edu4_deg:'MSc Strategic Product Design', edu4_name:'Διεθνές Πανεπιστήμιο Ελλάδος',
    edu5_deg:'MBA Leadership & Project Management', edu5_name:'Washington Univ. of Science & Technology',
    about_heading:'Σχετικά με Εμάς',
    about_quote:'«Η μηχανική είναι η τέχνη να μετατρέπεις μια ιδέα σε κάτι που κρατάς στα χέρια σου.»',
    about_p2:'Σχεδιάζουμε και κατασκευάζουμε μηχανολογικές διατάξεις και εξοπλισμό — καλύπτοντας κάθε στάδιο από R&amp;D και CAD ως τον συντονισμό κατασκευής και τον ποιοτικό έλεγχο. Κάθε παράδοση περιλαμβάνει πλήρη τεκμηρίωση: σχέδια εξαρτημάτων, συναρμολόγησης, BOM και οδηγίες.',
    about_p3:'Βάση: <strong><span class="accent-red">Αθήνα</span></strong> &amp; <strong><span class="accent-red">Θεσσαλονίκη</span></strong> — δουλεύουμε σε Ελλάδα και εξωτερικό.',
    about_p4:'Βελτιστοποιούμε την επιλογή υλικών, κατασκευή και συναρμολόγηση για οικονομική αποδοτικότητα και βιωσιμότητα — συντονίζουμε υπεργολάβους, επιβλέπουμε την κατασκευή και διασφαλίζουμε ότι κάθε παράδοση πληροί τα πρότυπα ποιότητας, αξιοπιστίας και ασφάλειας (ISO).',
    val_1_title:'Ακρίβεια', val_1_text:'Επαλήθευση με FEA, έλεγχος ανοχών, δοκιμές σε πραγματικές συνθήκες. Χωρίς υποθέσεις.', val_1_text_mobile:'Επαλήθευση με FEA, έλεγχος ανοχών. Χωρίς υποθέσεις.',
    val_2_title:'Πλήρης Κύκλος', val_2_text:'Από σκίτσο ως συναρμολόγηση — σχεδιασμός, BOM, κατασκευή και παράδοση. Παραδίδουμε, δεν μεταβιβάζουμε.', val_2_text_mobile:'Σχεδιασμός, BOM, κατασκευή, παράδοση. Παραδίδουμε — δεν μεταβιβάζουμε.',
    val_3_title:'Διεθνή Πρότυπα', val_3_text:'Σπουδές σε 3 χώρες. Διεθνής μηχανολογική αυστηρότητα εφαρμοσμένη σε κάθε τοπικό έργο.', val_3_text_mobile:'Σπουδές σε 3 χώρες. Διεθνής αυστηρότητα, τοπικά εφαρμοσμένη.',
    val_4_title:'Σχεδιασμός για Κατασκευή', val_4_text:'Σχεδιασμός για κατασκευή από την πρώτη μέρα. Σχέδια βελτιστοποιημένα για γρήγορη παραγωγή, ελάχιστα απόβλητα και πραγματική συναρμολόγηση.', val_4_text_mobile:'DFM από την πρώτη μέρα. Γρήγορη παραγωγή, ελάχιστα απόβλητα.',
    about_bullets:'<li>7+ χρόνια μηχανολογικός σχεδιασμός, 3D printing & κατασκευή</li><li>Πλήρης κύκλος: CAD → BOM → κατασκευή → ποιοτικός έλεγχος</li><li>FEA & σχεδιασμός για κατασκευή από την πρώτη μέρα</li>',
    proc_label:'Πώς Δουλεύουμε',
    proc_1_title:'Brief', proc_1_text:'Αφιερώνουμε χρόνο να κατανοήσουμε τις ανάγκες, τους περιορισμούς και τους στόχους σας πριν πάρουμε οποιαδήποτε σχεδιαστική απόφαση — γιατί ένα σωστό brief οδηγεί σε σωστό αποτέλεσμα.',
    proc_2_title:'Σχεδιασμός', proc_2_text:'3D μοντέλο σε SolidWorks, FEA, πλήρες BOM και τεχνικά σχέδια (εξαρτημάτων, συναρμολόγησης, οδηγίες) — όλα έτοιμα για παραγωγή.',
    proc_3_title:'Παράδοση', proc_3_text:'Συντονίζουμε υπεργολάβους, επιβλέπουμε την κατασκευή και διασφαλίζουμε τήρηση προτύπων ποιότητας, αξιοπιστίας και ασφάλειας — παραδίδοντας δοκιμασμένο, έτοιμο προς λειτουργία αποτέλεσμα.',
    principles_label:'Αρχές μας',
    prin_1_title:'Γνώση Κατασκευής', prin_1_text:'Σχεδιάζουμε γνωρίζοντας πώς κατασκευάζονται τα εξαρτήματα — κατεργασία, κοπή, συγκόλληση, εκτύπωση. Κάθε απόφαση αντικατοπτρίζει τους <span class="accent-red">πραγματικούς περιορισμούς</span> του εργαστηρίου, πριν το σχέδιο φτάσει εκεί.', prin_1_text_mobile:'Σχεδιασμός με γνώση της κατασκευής. Πραγματικοί περιορισμοί εργαστηρίου, από την αρχή.',
    prin_2_title:'Σωστά Εξαρχής', prin_2_text:'Τα λάθη στην κατασκευή είναι το <span class="accent-red">πραγματικό κόστος</span> — όχι τα υλικά. Σχεδιάζουμε ώστε να μην υπάρχουν: ανοχές που τηρούνται, εξαρτήματα που ταιριάζουν από την πρώτη φορά, προδιαγραφές που ανταποκρίνονται στο τι μπορεί να κάνει ο κατασκευαστής.', prin_2_text_mobile:'Ανοχές που τηρούνται. Εξαρτήματα που ταιριάζουν από την πρώτη φορά.',
    prin_3_title:'Πλήρης Ανάληψη', prin_3_text:'Από τον σχεδιασμό, τους υπολογισμούς και τις προσομοιώσεις ως τον συντονισμό κατασκευής, την επικοινωνία με προμηθευτές, την επίβλεψη συναρμολόγησης και τον <span class="accent-red">τελικό έλεγχο</span> — ένας μηχανικός, πλήρης υπευθυνότητα.', prin_3_text_mobile:'Ένας μηχανικός — από τον σχεδιασμό ως τον τελικό έλεγχο.',
    prin_4_title:'Web Design', prin_4_text:'Φτιάχνουμε <span class="accent-green">πλήρως custom ιστοσελίδες</span> — χειρόγραφο κώδικα, χωρίς templates, χωρίς builders. <a href="webdesign.html" class="principle-cta" id="prin-4-cta-el">Δείτε τις Υπηρεσίες Web Design →</a>',
    wd_label:'Αποκλειστικό Digital · Χωρίς Templates',
    wd_desc:'Φτιάχνουμε πλήρως custom ιστοσελίδες από το μηδέν — χωρίς templates, χωρίς page builders, χωρίς συμβιβασμούς. Κάθε pixel είναι σκόπιμο. Κάθε αλληλεπίδραση σχεδιάζεται.',
    wd_f1:'Custom HTML & CSS', wd_f2:'Διαδραστικά animations',
    wd_f3:'WebGL / 3D στοιχεία', wd_f4:'Mobile-first layout',
    wd_f5:'Δίγλωσσο (EN / EL)', wd_f6:'SEO-έτοιμη δομή',
    wd_f7:'Ενσωμάτωση φόρμας επικοινωνίας', wd_f8:'Μηδέν CMS overhead',
    wd_cta1:'Επικοινωνήστε →', wd_cta2:'Δείτε τα Έργα μας',
    wd_codebox_label:'// Χειρόγραφος. Πάντα.',
    wd_codebox_body:'Αυτό είναι κυριολεκτικά αυτό που γράφουμε. Καθαρό HTML, CSS και JavaScript — χωρίς generators, χωρίς εργαλεία export, χωρίς συντομεύσεις. Κάθε tag τοποθετείται σκόπιμα. Αυτό ακριβώς παραδίδουμε για εσάς.',
    wd_build_label:'// Πώς Γίνεται',
    wd_build_title:'Από Κώδικα<br>σε Εμπειρία',
    wd_build_caption:'Δείτε τα raw particles να οργανώνονται σε wireframe ιστοσελίδας, να αποδίδονται σε πλήρες layout, και να διαλύονται — ξανά και ξανά.',
    wd_off_label:'// Τι Φτιάχνουμε',
    wd_off1_name:'Επαγγελματικές Ιστοσελίδες',
    wd_off1_text:'Επαγγελματικές σελίδες για studios, agencies, συμβούλους και freelancers — σχεδιασμένες να ξεχωρίζουν και να μετατρέπουν επισκέπτες σε πελάτες.',
    wd_off2_name:'Portfolio & Showcase',
    wd_off2_text:'Συλλογές έργων και προσωπικά portfolios με εντυπωσιακά layouts, custom animations και ακριβή τυπογραφική επεξεργασία.',
    wd_off3_name:'Landing Pages',
    wd_off3_text:'Γρήγορες, στοχευμένες single-page σελίδες για λανσαρίσματα προϊόντων, εκδηλώσεις ή campaigns — σχεδιασμένες να πείθουν.',
    wd_off4_name:'3D & Διαδραστικό',
    wd_off4_text:'WebGL-powered 3D σκηνές, particle effects και scroll-driven αλληλεπιδράσεις — όπως το hero σε αυτό ακριβώς το site.',
    wd_why_label:'// Γιατί Custom Κώδικας;',
    wd_why_bad_head:'⬜ Template / Page Builder',
    wd_why_bad_1:'Μοιάζει με κάθε άλλη σελίδα — οι πελάτες το αντιλαμβάνονται',
    wd_why_bad_2:'Φουσκωμένος κώδικας, αργή φόρτωση, κακά Core Web Vitals',
    wd_why_bad_3:'Εξάρτηση από πλατφόρμα — αυξήσεις τιμών, αναγκαστικές αλλαγές',
    wd_why_bad_4:'Περιορισμένα animations — drag-and-drop δεν κάνει WebGL',
    wd_why_bad_5:'Γενικά breakpoints, όχι πραγματικά responsive',
    wd_why_bad_6:'Plugins δημιουργούν κινδύνους ασφαλείας & maintenance',
    wd_why_bad_7:'Αγοράζεις άδεια χρήσης, όχι τον κώδικά σου',
    wd_why_good_head:'▸ Expertease Custom Build',
    wd_why_good_1:'Μοναδικό — σχεδιασμένο γύρω από το brand σου',
    wd_why_good_2:'Λιτός, βελτιστοποιημένος κώδικας — γρήγορος παντού',
    wd_why_good_3:'Μηδενική εξάρτηση — hosting παντού δωρεάν',
    wd_why_good_4:'Αληθινή διαδραστικότητα: 3D, scroll-driven, particle systems',
    wd_why_good_5:'Pixel-perfect σε κάθε συσκευή και μέγεθος οθόνης',
    wd_why_good_6:'Χωρίς plugins, χωρίς βάρος — μόνο ό,τι χρειάζεται',
    wd_why_good_7:'Κατέχεις πλήρως τα source files',
    wd_work_label:'// Οι Δουλειές μας',
    wd_work_title:'Sites που Φτιάξαμε',
    wd_work_sub:'Κάθε project είναι χειρόγραφος κώδικας — μοναδικό στον σχεδιασμό, ακριβές στην εκτέλεση.',
    wd_proj_1_name:'Σταύρος Μάλλιαρης',
    wd_proj_1_role:'Τεχνικός Ασφαλείας · Μελέτες & Συμβουλευτική',
    wd_proj_1_desc:'Επαγγελματικό site για πιστοποιημένο τεχνικό ασφαλείας — δίγλωσσο, με καθαρή τυπογραφία και δομημένη παρουσίαση υπηρεσιών.',
    wd_proj_1_link:'Δείτε το Site',
    wd_proj_2_name:'Βάϊος Λιάπης',
    wd_proj_2_role:'Πολιτικός Μηχανικός · Αθήνα',
    wd_proj_2_desc:'Portfolio και επαγγελματική παρουσία για πολιτικό μηχανικό — ξεκάθαρη δομή υπηρεσιών και design που μεταδίδει εμπειρία με μια ματιά.',
    wd_proj_2_link:'Δείτε το Site',
    wd_proj_3_name:'Τεχνικό Γραφείο Γκούβελης',
    wd_proj_3_role:'Μηχανολόγος Μηχανικός · Θεσσαλονίκη',
    wd_proj_3_desc:'Site τεχνικού γραφείου εξειδικευμένου σε μελέτες οχημάτων και εγκρίσεις τύπου — φτιαγμένο για αξιοπιστία και lead generation.',
    wd_proj_3_link:'Δείτε το Site',
    wd_cta_label:'// Ας Φτιάξουμε Κάτι',
    wd_cta_title:'Έχεις μια ιστοσελίδα<br>στο μυαλό σου;',
    wd_cta_text:'Πες μας για την επιχείρησή σου και τι χρειάζεσαι. Θα σχεδιάσουμε και θα φτιάξουμε μια ιστοσελίδα που σε αντιπροσωπεύει πραγματικά — από το πρώτο pixel ως το τελευταίο deploy.',
    wd_cta_price_from:'Ξεκινάμε από',
    wd_cta_btn1:'Επικοινωνήστε →', wd_cta_btn2:'Δείτε τα Έργα μας',
    wd_cta_perk1:'✓ Custom σχεδιασμός, χωρίς templates', wd_cta_perk2:'✓ Mobile-first &amp; γρήγορο', wd_cta_perk3:'✓ Δωρεάν αναθεωρήσεις',
    projects_heading:'Έργα',
    sw_heading:'Λογισμικό', sw_label:'Ενεργό Προϊόν · easemanual.eu',
    sw_desc:'Λογισμικό που αυτοματοποιεί την τεχνική μελέτη για άδεια κυκλοφορίας οχημάτων ειδικής χρήσης — βάσει ΥΑ 80255/4693/19/2020. Φτιαγμένο από μηχανικούς για μηχανικούς.',
    sw_f1:'Τεχνικοί υπολογισμοί', sw_f2:'Διαγράμματα φόρτισης', sw_f3:'Σχέδια A3', sw_f4:'Αυτόματη μελέτη Word',
    sw_f5:'Άξονες & εφεδρανισμοί', sw_f6:'Ευστάθεια & πέδηση', sw_f7:'Συγκολλήσεις & ελατήρια', sw_f8:'Γερανοί & καλαθοφόρα',
    sw_cta1:'Δείτε το Προϊόν →', sw_cta2:'Τιμολόγηση', sw_cta3:'Λήψεις',
    sw_d_kicker1:'Τι κάνει', sw_d_title:'Δούλεψε έξυπνα, όχι σκληρά.',
    sw_d_lead:'Ένα ισχυρό, εύχρηστο εργαλείο που αυτοματοποιεί την εκπόνηση τεχνικών μελετών για άδεια κυκλοφορίας οχημάτων ειδικής χρήσης. Αυτοματοποιεί κάθε υπολογισμό — παράγοντας αξιόπιστα αποτελέσματα και πλήρη τεκμηρίωση σε λεπτά, όχι ημέρες.',
    sw_d_kicker2:'Πώς λειτουργεί',
    sw_wf1:'Εισαγωγή τεχνικών χαρακτηριστικών οχήματος', sw_wf2:'Εισαγωγή φορτίων στους άξονες και το πλαίσιο',
    sw_wf3:'Αυτόματη εκτέλεση υπολογισμών', sw_wf4:'Δημιουργία διαγραμμάτων τεμνουσών και ροπών κάμψης',
    sw_wf5:'Ανασκόπηση συνοπτικού πίνακα αποτελεσμάτων', sw_wf6:'Δημιουργία πλήρους τεχνικής μελέτης με ένα κλικ',
    sw_d_link:'Πλήρης παρουσίαση προϊόντος →',
    sw_d_kicker3:'Δυνατότητες',
    sw_fc1_name:'Ανάλυση Οχήματος', sw_fc1_1:'Υποστήριξη έως 5 αξόνων', sw_fc1_2:'Έλεγχοι τάσεων αξόνων & ελαστικών', sw_fc1_3:'Αυτόματη τοποθέτηση φορτίων', sw_fc1_4:'Αυτόματη κατασκευή διαγράμματος ισορροπίας',
    sw_fc2_name:'Πλαίσιο & Κατασκευή', sw_fc2_1:'Απλοί & σύνθετοι τύποι πλαισίου', sw_fc2_2:'Υπολογισμοί ροπών κάμψης & τεμνουσών', sw_fc2_3:'Ανάλυση κοχλιωτών συνδέσεων', sw_fc2_4:'Υπολογισμοί συγκολλήσεων υπερκατασκευής',
    sw_fc3_name:'Ασφάλεια & Ευστάθεια', sw_fc3_1:'Έλεγχος συστήματος πέδησης', sw_fc3_2:'Ακτίνα στροφής & ευστάθεια', sw_fc3_3:'Έλεγχος ανατροπής γερανού', sw_fc3_4:'Υπολογισμοί ελατηριωτής ανάρτησης',
    sw_fc4_name:'Εξαγωγή & Αναφορές', sw_fc4_1:'Γρήγορη εξαγωγή PDF', sw_fc4_2:'Τεχνικά σχέδια A3', sw_fc4_3:'Αυτόματη δημιουργία μελέτης Word', sw_fc4_4:'Διαδικτυακές βιβλιοθήκες & πρότυπα',
    team_heading:'Ομάδα', team_page_heading:'Ομάδα',
    proc_exp_text:'{yrs} χρόνια σε ρομποτική, εξοπλισμό ασφαλείας και ακριβή κατασκευή — πέντε πτυχία, τρεις χώρες.',
    founder_name:'Δημήτρης<br>Μουδιώτης',
    founder_label:'Ιδρυτής &amp; Επικεφαλής Μηχανικός',
    founder_bio:'Μηχανολόγος Μηχανικός (ΑΠΘ) με ' + EXP_YEARS + '+ χρόνια εμπειρίας σε ρομποτική, εξοπλισμό ασφαλείας, βιομηχανικά μηχανήματα και ακριβή κατασκευή. Σπούδασε σε πέντε πανεπιστήμια στην Ελλάδα, τη Γαλλία και τις ΗΠΑ.',
    fcs_years:'Χρόνια', fcs_projects:'Έργα', fcs_degrees:'Πτυχία', fcs_scholarships:'Υποτροφίες',
    founder_profile_btn:'Πλήρες Προφίλ →',
    founder_photo_accent:'Ιδρυτής',
    founder_mono_label:'Ιδρυτής &amp; Επικεφαλής Μηχανικός',
    founder_name_team:'Δημήτριος Μουδιώτης',
    founder_text:'Μηχανολόγος Μηχανικός (ΑΠΘ) με ' + EXP_YEARS + '+ χρόνια πρακτικής εμπειρίας σε ρομποτική, εξοπλισμό ασφαλείας, κατασκευή φύλλου μετάλλου και ακριβές 3D printing. Κατέχει πέντε πανεπιστημιακά πτυχία από κορυφαία ιδρύματα στην Ελλάδα, τη Γαλλία και τις ΗΠΑ — συνδυάζοντας βαθιά τεχνική εξειδίκευση με ισχυρές δεξιότητες διαχείρισης έργων και ανάπτυξης προϊόντων.',
    edu_section_label:'Ακαδημαϊκό Υπόβαθρο',
    edu_section_heading:'5 Πανεπιστήμια &middot; 3 Χώρες',
    val_integrity_text:'Ειλικρινείς εκτιμήσεις, πλήρης υπευθυνότητα από το σκίτσο ως την παράδοση. Χωρίς εκπλήξεις, χωρίς συντομεύσεις.',
    val_innovation_text:'Κλασική μηχανική συναντά την ανάγκη για έξυπνες λύσεις — DFM γεωμετρία, διεπιστημονική γνώση.',
    ticker: ['3D Σχεδιασμός','3D Printing','Laser Cut & Engrave','Φύλλο Μετάλλου','Γρήγορη Πρωτοτυποποίηση','Λίστα Υλικών (BOM)','Διαχείριση Έργου','Ανάλυση FEA','από ιδέα σε πραγματικότητα','FDM · SLA · SLS'],
    pf_labels:['Ιδέα','CAD Σχεδιασμός','FEA & Προσομοίωση','Κατασκευή','Ποιοτικός Έλεγχος','Παράδοση'],
    pf_subs:['Απαιτήσεις & brief','3D μοντέλο · BOM · σχέδια','Τάσεις · κόπωση · κατασκευή','Κατεργασία · printing · συγκόλληση','Δοκιμές · επιθεώρηση · παραλαβή','Παράδοση & ανατροφοδότηση'],
    pf_loop:'Βρόχος συνεχούς βελτίωσης',
    pr_selfprint_badge:'// Για Makers &amp; Designers',
    pr_selfprint_title:'Θέλετε να Εκτυπώσετε Μόνοι σας;',
    pr_selfprint_sub:'Έχετε δικό σας 3D printer; Χρησιμοποιήστε τον δωρεάν υπολογιστή κόστους παρακάτω — ανεβάστε το STL ή STEP αρχείο σας και λάβετε άμεση εκτίμηση υλικού, χρόνου εκτύπωσης και κόστους. Χωρίς εγγραφή.',
    pr_selfprint_cta:'Δοκιμάστε τον Υπολογιστή',
    pr_est_drop_or:'ή', pr_est_browse:'Επιλογή Αρχείου',
    pr_est_lbl_material:'Υλικό', pr_est_lbl_infill:'Πλήρωση',
    pr_est_lbl_layer:'Ύψος Στρώματος', pr_est_lbl_strength:'Αντοχή / Τοιχώματα',
    pr_est_lbl_colour:'Χρώμα', pr_est_lbl_qty:'Ποσότητα',
    pr_est_single_colour:'Μονόχρωμο',
    pr_est_ams_toggle:'Εναλλαγή AMS πολύχρωμο (+2× υλικό)',
    pr_est_preview_empty:'Η 3D προεπισκόπηση εμφανίζεται εδώ',
    pr_est_viewer_hint:'σύρε για περιστροφή · κύλιση για ζουμ',
    pr_est_price_label:'Συνολική Εκτίμηση',
    pr_est_disclaimer:'Εκτίμηση μόνο — τελική τιμή επιβεβαιώνεται μετά από έλεγχο.',
    pr_est_quote_link:'Ζητήστε ακριβή προσφορά',
    pr_est_mat:{'pla':'PLA — Τυπικό','pla+':'PLA+ — Ενισχυμένο','petg':'PETG — Ανθεκτικό','abs':'ABS — Θερμοανθεκτικό'},
    pr_est_infill:['15% — Σχέδιο','20% — Τυπικό','40% — Ισχυρό','100% — Συμπαγές'],
    pr_est_strength:['Ελαφρύ','Τυπικό','Ισχυρό','Πολύ Ισχυρό'],
    contact_label:'// Ας Δουλέψουμε Μαζί',
    contact_heading:'Έχετε κάποιο project;',
    contact_sub:'Ένα εξάρτημα ή ολόκληρο project — η Expertease είναι εδώ.',
    midcta_label:'// Έτοιμοι να Ξεκινήσουμε;',
    midcta_heading:'Έχετε κάποιο project;',
    midcta_sub:'Από ένα εξάρτημα ως πλήρη διαχείριση έργου — ας μιλήσουμε για αυτό που χρειάζεστε.',
    midcta_btn:'Δωρεάν Αρχική Ενημέρωση',
    contact_label_static:'// Επικοινωνήστε',
    contact_heading_static:'Ας Δουλέψουμε Μαζί',
    contact_sub_static:'Έχετε κάποιο project; Συμπληρώστε τη φόρμα και θα επικοινωνήσουμε εντός μιας εργάσιμης ημέρας.',
    form_direct_label:'Στείλτε μας άμεσο μήνυμα!',
    form_lbl_name:'ΟΝΟΜΑ', form_lbl_email:'EMAIL',
    form_lbl_phone:'ΤΗΛΕΦΩΝΟ', form_lbl_subject:'ΘΕΜΑ', form_lbl_message:'ΜΗΝΥΜΑ',
    form_ph_name:'Το όνομά σας', form_ph_message:'Πείτε μας για το project σας...',
    form_opt_default:'Επιλέξτε υπηρεσία…',
    form_opt_1:'Μηχανολογικός Σχεδιασμός',
    form_opt_2:'3D Printing',
    form_opt_3:'Laser Cut &amp; Engrave',
    form_opt_4:'3D Μοντέλα / CAD',
    form_opt_5:'Web Design',
    form_opt_6:'Λογισμικό',
    form_opt_7:'Γενική Ερώτηση',
    form_submit_label:'ΑΠΟΣΤΟΛΗ ΜΗΝΥΜΑΤΟΣ',
    footer_copy:'© 2026 Expertease Designs', footer_loc:'Αθήνα, Ελλάδα', footer_loc_bar:'Αθήνα, Ελλάδα',
    ec_ad_question:'Σας άρεσε το site;', ec_ad_cta:'Φτιάξτε το δικό σας', ec_label:'Σχεδιάστηκε από',
    pr_label:'Εξατομικευμένη Κατασκευή · Αθήνα',
    pr_title:'3D Print<br>Laser Cut<br>&amp; Engrave',
    pr_desc:'Από ιδέα σε έτοιμο εξάρτημα — αναλαμβάνουμε εξατομικευμένο 3D printing, αντίστροφη μηχανική και laser cutting &amp; engraving. Λειτουργικά πρωτότυπα, μεμονωμένα εξαρτήματα και διακοσμητικές εργασίες εσωτερικά.',
    pr_f1:'FDM 3D Printing', pr_f2:'Custom Σχέδια',
    pr_f3:'Αντίστροφη Μηχανική', pr_f4:'Laser Cutting',
    pr_f5:'Laser Engraving', pr_f6:'PLA · PETG · ABS',
    pr_f7:'Ξύλο · Ακρυλικό · Μέταλλο', pr_f8:'Πρωτότυπο Ίδιας Μέρας',
    pr_cta1:'Ζητήστε Προσφορά →', pr_cta2:'Δείτε όλα τα Έργα',
    pr_off_label:'// Τι Κάνουμε',
    pr_off1_name:'Custom 3D Printing',
    pr_off1_text:'FDM printing σε PLA, PETG, ABS και specialty filaments. Από λειτουργικά στηρίγματα και περιβλήματα ως καλλιτεχνικά αντικείμενα — σχεδιασμός σε SolidWorks και εκτύπωση στις προδιαγραφές.',
    pr_off2_name:'Αντίστροφη Μηχανική',
    pr_off2_text:'Σπασμένο ή διακοπέν εξάρτημα; Μετράμε, μοντελοποιούμε και εκτυπώνουμε ακριβές αντίγραφο. Γρηγορότερα και φθηνότερα από την εύρεση — με δυνατότητα βελτίωσης.',
    pr_off3_name:'Laser Cutting',
    pr_off3_text:'Ακριβείς κοπές σε ξύλο, ακρυλικό, χαρτόνι, δέρμα και λεπτά μέταλλα. Καθαρά άκρα, στενές ανοχές, γρήγορη παράδοση — ιδανικό για εξαρτήματα και διακοσμητικά πάνελ.',
    pr_off4_name:'Laser Engraving',
    pr_off4_text:'Μόνιμη χάραξη σε ξύλο, ανοδιωμένο αλουμίνιο, δέρμα, γυαλί και βαμμένα μέταλλα. Λογότυπα, σειριακοί αριθμοί, έργα τέχνης, εξατομικευμένα δώρα.',
    pr_work_label:'// Δουλειές μας',
    pr_work_title:'Εξαρτήματα που Φτιάξαμε',
    pr_work_sub:'Κάθε project σχεδιάζεται, εκτυπώνεται ή κόβεται εσωτερικά — ακριβές στην εκτέλεση, κατασκευασμένο για να αντέχει.',
    pr_proj_1_name:'Αυτόματος Τροφοδότης Γάτας',
    pr_proj_1_role:'3D Print · Custom Σχεδιασμός Προϊόντος',
    pr_proj_1_desc:'Πλήρως custom αυτόματος τροφοδότης γάτας — μηχανισμός χρονισμένης διανομής, εργονομική δεξαμενή και εύκολη συναρμολόγηση. Κάθε εξάρτημα σε SolidWorks και εκτυπωμένο σε PLA.',
    pr_proj_1_link:'Επικοινωνήστε',
    pr_proj_2_name:'Επιτραπέζιος Ανεμιστήρας',
    pr_proj_2_role:'3D Print · Σχεδιασμός Προϊόντος · Αεροδυναμική',
    pr_proj_2_desc:'Custom επιτραπέζιος ανεμιστήρας με βελτιστοποιημένη γεωμετρία πτερύγων και συμπαγές περίβλημα — αθόρυβη λειτουργία και μέγιστη ροή αέρα. Πλήρως εκτυπωμένη συναρμολόγηση.',
    pr_proj_2_link:'Επικοινωνήστε',
    pr_proj_3_name:'Μεταλλική Διακόσμηση Τοίχου',
    pr_proj_3_role:'Laser Cut · Εσωτερική Διακόσμηση · Φύλλο Μετάλλου',
    pr_proj_3_desc:'Custom laser-cut μεταλλική διακόσμηση τοίχου — περίπλοκα σχέδια από φύλλο χάλυβα, βαφή σκόνης. Κατάλληλο για οικιακούς και εμπορικούς χώρους. Διαθέσιμα custom μεγέθη και μοτίβα.',
    pr_proj_3_link:'Επικοινωνήστε',
    pr_proj_4_name:'Συσκευή Απώθησης Σκύλων',
    pr_proj_4_role:'3D Print · Περίβλημα Ηλεκτρονικών · Custom Σχέδιο',
    pr_proj_4_desc:'Συμπαγής συσκευή απώθησης σκύλων — πλήρως custom περίβλημα σχεδιασμένο γύρω από τα ηλεκτρονικά. Αδιάβροχο, καθαρή εφαρμογή, snap-close συναρμολόγηση.',
    pr_proj_4_link:'Επικοινωνήστε',
    pr_cta_label:'// Ας Φτιάξουμε Κάτι',
    pr_cta_title:'Έχεις κάποιο εξάρτημα<br>στο μυαλό σου;',
    pr_cta_text:'Στείλε μας ένα σκίτσο, ένα σπασμένο εξάρτημα ή απλώς μια περιγραφή. Θα το σχεδιάσουμε, εκτυπώσουμε ή κόψουμε — και θα σου παραδώσουμε έτοιμο κομμάτι.',
    pr_cta_price_from:'Ξεκινάμε από',
    pr_cta_btn1:'Ζητήστε Προσφορά →',
    pr_cta_perk1:'✓ Custom σχεδιασμός συμπεριλαμβάνεται', pr_cta_perk2:'✓ Γρήγορη παράδοση', pr_cta_perk3:'✓ Διαθέσιμη αντίστροφη μηχανική',
  },
  en: {
    nav_about:'About', nav_projects:'Projects', nav_software:'Software',
    nav_webdesign:'Web Design', nav_3dprint:'3D Print', nav_experience:'Team', nav_contact:'Contact',
    hero_tag:'// Mechanical Design & 3D Printing Studio — Athens, GR',
    hero_title:'Mechanical Design · 3D Printing · Laser Cut & Engrave',
    hero_desc:'<strong>Expertease Designs</strong>: machine design &bull; sheet metal &bull; rapid prototyping &bull; BOM',
    hero_cta_work:'View Projects →', hero_cta_contact:'Get in Touch',
    stat_years:'Years Experience', stat_projects:'Projects Delivered', stat_degrees:'University Degrees',
    edu_strip:'Founder — Dimitrios Moudiotis · 5 Universities in 3 Countries',
    edu1_deg:'Dipl.-Ing.', edu1_name:'Mechanical Engineering',
    edu2_deg:'MSc General Engineering', edu2_name:'École Centrale Paris',
    edu3_deg:'MSc Powertrain Engineering', edu3_name:'IFP School',
    edu4_deg:'MSc Strategic Product Design', edu4_name:'International Hellenic University',
    edu5_deg:'MBA Leadership & Project Management', edu5_name:'Washington Univ. of Science & Technology',
    about_heading:'About',
    about_quote:'"Engineering is the art of turning an idea into something you can hold in your hands."',
    about_p2:'We design and build mechanical devices, products, and equipment — covering every stage from R&amp;D and CAD to manufacturing coordination and quality control. Every project is delivered with complete documentation: part drawings, assembly drawings, BOM structure, and instructions.',
    about_p3:'Based in <strong><span class="accent-red">Athens, Greece</span></strong> — available for projects across Greece and internationally.',
    about_p4:'We optimise material selection, manufacturing, and assembly for cost-effectiveness and sustainability — coordinating subcontractors, supervising construction, and enforcing ISO quality, reliability, and safety standards on every deliverable.',
    val_1_title:'Precision', val_1_text:'FEA-verified, tolerance-stacked, tested in real conditions. We don\'t approximate.', val_1_text_mobile:'FEA-verified, tolerance-stacked. No approximations.',
    val_2_title:'Full Lifecycle', val_2_text:'From sketch to assembly — design, BOM, fabrication, and handover. We deliver, we don\'t hand off.', val_2_text_mobile:'Design, BOM, fabrication, handover. We deliver — we don\'t hand off.',
    val_3_title:'Global Standards', val_3_text:'Educated across 3 countries. International engineering rigour applied to every local project.', val_3_text_mobile:'Educated across 3 countries. International rigour, applied locally.',
    val_4_title:'Built to Make', val_4_text:'Design for Manufacturability from day one. Designs optimised for fast fabrication, minimal waste, and real-world assembly.', val_4_text_mobile:'DFM from day one. Fast to fabricate, minimal waste, fits first time.',
    about_bullets:'<li>7+ years mechanical design, 3D printing & fabrication</li><li>Full cycle: CAD → BOM → fabrication → quality control</li><li>FEA simulation & Design for Manufacturability from day one</li>',
    proc_label:'How We Work',
    proc_1_title:'Brief', proc_1_text:'We take time to understand your requirements, constraints, and goals before committing to any design direction — because the right brief leads to the right outcome.',
    proc_2_title:'Design', proc_2_text:'Full 3D model in SolidWorks, FEA validation, complete BOM, and technical drawings (part, assembly, instructions) — every deliverable ready for production.',
    proc_3_title:'Deliver', proc_3_text:'We coordinate subcontractors, supervise fabrication, and make sure quality, reliability, and safety standards are met — then hand over a tested, production-ready assembly.',
    principles_label:'How We Work',
    prin_1_title:'Manufacturing Intelligence', prin_1_text:'We design knowing how parts are actually made — machined, bent, welded, printed. Every decision reflects the <span class="accent-red">real constraints</span> of the shop floor, before the drawing ever gets there.', prin_1_text_mobile:'Designed for how parts are actually made. Real shop floor constraints, before the drawing gets there.',
    prin_2_title:'Zero Rework', prin_2_text:'Manufacturing errors are the <span class="accent-red">real cost</span> — not materials. I design to eliminate them: tolerances that can be held, assemblies that fit first time, specifications aligned with what the manufacturer can actually deliver.', prin_2_text_mobile:'Tolerances that can be held. Assemblies that fit first time.',
    prin_3_title:'Full Ownership', prin_3_text:'From design, calculations, and simulations through manufacturing coordination, supplier communication, assembly oversight, and <span class="accent-red">final verification</span> — one engineer, full accountability.', prin_3_text_mobile:'One engineer — from design and simulation through fabrication and final verification.',
    prin_4_title:'Web Design', prin_4_text:'We also build <span class="accent-green">fully custom websites</span> — hand-coded from scratch. No templates, no builders, no limits. <a href="webdesign.html" class="principle-cta" id="prin-4-cta-en">See our Web Design →</a>',
    wd_label:'Bespoke Digital · No Templates',
    wd_desc:'We build fully custom websites from scratch — no templates, no page builders, no shortcuts. Every pixel is intentional. Every interaction is designed.',
    wd_f1:'Custom HTML & CSS', wd_f2:'Interactive animations',
    wd_f3:'WebGL / 3D elements', wd_f4:'Mobile-first layout',
    wd_f5:'Bilingual (EN / EL)', wd_f6:'SEO-ready structure',
    wd_f7:'Contact form integration', wd_f8:'Zero CMS overhead',
    wd_cta1:'Get in Touch →', wd_cta2:'View Our Projects',
    wd_codebox_label:'// Hand-Coded. Always.',
    wd_codebox_body:'This is literally what we write. Pure HTML, CSS, and JavaScript — no generators, no export tools, no shortcuts. Every tag placed intentionally. That\'s exactly what we deliver for you.',
    wd_build_label:'// How It Comes Together',
    wd_build_title:'From Code<br>to Experience',
    wd_build_caption:'Watch raw particles organize into a website wireframe, render into a complete layout, then dissolve — and do it all over again.',
    wd_off_label:'// What We Build',
    wd_off1_name:'Business Websites',
    wd_off1_text:'Professional, conversion-focused sites for studios, agencies, consultancies, and freelancers. Built to stand out, not blend in.',
    wd_off2_name:'Portfolio & Showcase',
    wd_off2_text:'High-impact project galleries and personal portfolios with immersive layouts, custom animations, and precise typographic detail.',
    wd_off3_name:'Landing Pages',
    wd_off3_text:'Fast, targeted single-page sites for product launches, events, or campaigns — designed to inform and convert.',
    wd_off4_name:'3D & Interactive',
    wd_off4_text:'WebGL-powered 3D scenes, particle effects, and scroll-driven interactions — like the hero on this very site.',
    wd_why_label:'// Why Custom Code?',
    wd_why_bad_head:'⬜ Template / Page Builder',
    wd_why_bad_1:'Looks like every other site — clients notice',
    wd_why_bad_2:'Bloated code, slow load times, poor Core Web Vitals',
    wd_why_bad_3:'Locked into platform — pricing hikes, forced updates',
    wd_why_bad_4:'Limited animations — drag-and-drop can\'t do real WebGL',
    wd_why_bad_5:'Generic mobile breakpoints, not truly responsive',
    wd_why_bad_6:'Plugin sprawl creates security surface & maintenance debt',
    wd_why_bad_7:'You own a licence, not your own code',
    wd_why_good_head:'▸ Expertease Custom Build',
    wd_why_good_1:'Unique — designed around your brand, not a template',
    wd_why_good_2:'Lean, hand-optimised code — fast everywhere',
    wd_why_good_3:'Zero vendor lock-in — host it anywhere for free',
    wd_why_good_4:'Real interactivity: 3D, scroll-driven, particle systems',
    wd_why_good_5:'Pixel-perfect on every device and screen size',
    wd_why_good_6:'No plugins, no bloat — just what the project needs',
    wd_why_good_7:'You own the source files, completely',
    wd_work_label:'// Our Work',
    wd_work_title:'Sites We\'ve Built',
    wd_work_sub:'Every project is hand-coded from scratch — unique in design, precise in execution.',
    wd_proj_1_name:'Stavros Malliaris',
    wd_proj_1_role:'Safety Engineer · Health &amp; Safety Consulting',
    wd_proj_1_desc:'Professional services website for a certified safety engineer — bilingual, conversion-focused, with clean typography and a structured service layout.',
    wd_proj_1_link:'View Site',
    wd_proj_2_name:'Vaios Liapis',
    wd_proj_2_role:'Civil Engineer · Athens',
    wd_proj_2_desc:'Portfolio and professional presence for a civil engineer — clear service structure, strong personal brand, and a design that communicates expertise at a glance.',
    wd_proj_2_link:'View Site',
    wd_proj_3_name:'Gkouvelis Technical Office',
    wd_proj_3_role:'Mechanical Engineer · Thessaloniki',
    wd_proj_3_desc:'Technical office website specialising in vehicle studies and type approvals — built for clarity, trust, and lead generation in a competitive technical services market.',
    wd_proj_3_link:'View Site',
    wd_cta_label:'// Let\'s Build Something',
    wd_cta_title:'Got a website<br>in mind?',
    wd_cta_text:'Tell us about your business and what you need. We\'ll design and build a website that genuinely represents you — from the first pixel to the final deploy.',
    wd_cta_price_from:'Starting from',
    wd_cta_btn1:'Get in Touch →', wd_cta_btn2:'See Our Projects',
    wd_cta_perk1:'✓ Custom design, no templates', wd_cta_perk2:'✓ Mobile-first & fast', wd_cta_perk3:'✓ Free revisions included',
    projects_heading:'Projects',
    sw_heading:'Software', sw_label:'Active Product · easemanual.eu',
    sw_desc:'Powerful software automating the creation of technical studies for special-purpose vehicle licensing — per Greek regulation YA 80255/4693/19/2020. Built by engineers for engineers.',
    sw_f1:'Technical calculations', sw_f2:'Load diagrams', sw_f3:'A3 vehicle drawings', sw_f4:'Automatic Word report',
    sw_f5:'Shafts & bearings', sw_f6:'Stability & braking', sw_f7:'Welds & springs', sw_f8:'Cranes & platforms',
    sw_cta1:'View Product →', sw_cta2:'Pricing', sw_cta3:'Downloads',
    sw_d_kicker1:'What it does', sw_d_title:'Work smart, not hard.',
    sw_d_lead:'A powerful, user-friendly tool that automates the creation of technical studies for special-use and special-purpose vehicle licensing. It automates every calculation process — generating reliable results and complete documentation in minutes, not days.',
    sw_d_kicker2:'How it works',
    sw_wf1:'Enter vehicle technical specifications', sw_wf2:'Input loads affecting axles and frame',
    sw_wf3:'Automatic calculations execute instantly', sw_wf4:'Generate shear force & bending moment diagrams',
    sw_wf5:'Review comprehensive calculation summary', sw_wf6:'Create the full technical study with one click',
    sw_d_link:'Full product details →',
    sw_d_kicker3:'Capabilities',
    sw_fc1_name:'Vehicle Analysis', sw_fc1_1:'Up to 5 axles support', sw_fc1_2:'Axle & tyre stress checks', sw_fc1_3:'Automatic load positioning', sw_fc1_4:'Free-body diagram generation',
    sw_fc2_name:'Frame & Structure', sw_fc2_1:'Simple & complex frame types', sw_fc2_2:'Bending moment & shear calcs', sw_fc2_3:'Bolted connection analysis', sw_fc2_4:'Superstructure weld calcs',
    sw_fc3_name:'Safety & Stability', sw_fc3_1:'Braking system verification', sw_fc3_2:'Turning radius & stability', sw_fc3_3:'Crane overturning checks', sw_fc3_4:'Spring suspension calcs',
    sw_fc4_name:'Output & Export', sw_fc4_1:'Quick PDF export', sw_fc4_2:'A3 technical drawings', sw_fc4_3:'Auto Word report generation', sw_fc4_4:'Online libraries & templates',
    team_heading:'Team', team_page_heading:'Team',
    proc_exp_text:'Nine years across robotics, safety equipment and precision fabrication — five degrees, three countries.',
    founder_name:'Dimitrios<br>Moudiotis',
    founder_label:'Founder &amp; Lead Engineer',
    founder_bio:'Mechanical Engineer (AUTH) with ' + EXP_YEARS + '+ years of experience across robotics, safety equipment, industrial machinery, and precision fabrication. Studied at five universities in Greece, France, and the USA.',
    fcs_years:'Years', fcs_projects:'Projects', fcs_degrees:'Univ. Degrees', fcs_scholarships:'Scholarships',
    founder_profile_btn:'Full Profile →',
    founder_photo_accent:'Founder',
    founder_mono_label:'Founder &amp; Lead Engineer',
    founder_name_team:'Dimitrios Moudiotis',
    founder_text:'Mechanical Engineer (AUTH) with ' + EXP_YEARS + '+ years of hands-on experience across robotics, safety equipment, sheet metal fabrication, and precision 3D printing. Holds five university degrees from leading institutions in Greece, France and the USA — combining deep technical expertise with strong project management and product development skills.',
    edu_section_label:'Academic Background',
    edu_section_heading:'5 Universities · 3 Countries',
    val_integrity_text:'Honest estimates, full accountability from sketch to delivery. No surprises, no shortcuts.',
    val_innovation_text:'Classical engineering meets a drive for smarter solutions — DFM geometry, cross-disciplinary insight.',
    ticker: ['3D Design','3D Printing','Laser Cut & Engrave','Sheet Metal','Rapid Prototyping','Bill of Materials','Project Management','FEA Analysis','from vision to reality','FDM · SLA · SLS'],
    pf_labels:['Concept','CAD Design','FEA & Simulation','Fabrication','Quality Check','Customer'],
    pf_subs:['Requirements & brief','3D model · BOM · drawings','Stress · fatigue · manufacturing','Machining · printing · welding','Testing · inspection · sign-off','Delivery & feedback'],
    pf_loop:'Continuous improvement loop',
    pr_selfprint_badge:'// For Makers &amp; Designers',
    pr_selfprint_title:'Want to Print Your Own Parts?',
    pr_selfprint_sub:'Have your own 3D printer? Use our free cost calculator below — upload your STL or STEP file and get an instant estimate on material usage, print time, and cost. No account needed.',
    pr_selfprint_cta:'Try the Calculator',
    pr_est_drop_or:'or', pr_est_browse:'Browse File',
    pr_est_lbl_material:'Material', pr_est_lbl_infill:'Infill',
    pr_est_lbl_layer:'Layer Height', pr_est_lbl_strength:'Strength / Walls',
    pr_est_lbl_colour:'Colour', pr_est_lbl_qty:'Quantity',
    pr_est_single_colour:'Single Colour',
    pr_est_ams_toggle:'Toggle AMS multicolor (+2× material)',
    pr_est_preview_empty:'3D preview appears here',
    pr_est_viewer_hint:'drag to rotate · scroll to zoom',
    pr_est_price_label:'Total Quote',
    pr_est_disclaimer:'Estimate only — final price confirmed after review.',
    pr_est_quote_link:'Get exact quote',
    pr_est_mat:{'pla':'PLA — Standard','pla+':'PLA+ — Enhanced','petg':'PETG — Tough','abs':'ABS — Heat-resistant'},
    pr_est_infill:['15% — Draft','20% — Standard','40% — Strong','100% — Solid'],
    pr_est_strength:['Light','Default','Strong','Very Strong'],
    contact_label:'// Let\'s Work Together',
    contact_heading:'Got a project in mind?',
    contact_sub:'From designing a single component to managing an entire project — Expertease is here.',
    midcta_label:'// Ready to Start?',
    midcta_heading:'Got a project in mind?',
    midcta_sub:'From a single component to full project management — let\'s talk about what you need.',
    midcta_btn:'Get a Free Consultation',
    contact_label_static:'// Get in Touch',
    contact_heading_static:'Let\'s Work Together',
    contact_sub_static:'Have a project in mind? Fill in the form and we\'ll get back to you within one business day.',
    form_direct_label:'Send us a direct mail!',
    form_lbl_name:'NAME', form_lbl_email:'EMAIL',
    form_lbl_phone:'PHONE', form_lbl_subject:'SUBJECT', form_lbl_message:'MESSAGE',
    form_ph_name:'Your name', form_ph_message:'Tell us about your project...',
    form_opt_default:'Select a service…',
    form_opt_1:'Mechanical Design',
    form_opt_2:'3D Printing',
    form_opt_3:'Laser Cut &amp; Engrave',
    form_opt_4:'3D Models / CAD',
    form_opt_5:'Web Design',
    form_opt_6:'Software',
    form_opt_7:'General Enquiry',
    form_submit_label:'SEND MESSAGE',
    footer_copy:'© 2026 Expertease Designs', footer_loc:'Athens, Greece', footer_loc_bar:'Athens, Greece',
    ec_ad_question:'Like this site?', ec_ad_cta:'Let\'s build yours', ec_label:'Designed by',
    pr_label:'Custom Fabrication · Athens, GR',
    pr_title:'3D Print<br>Laser Cut<br>&amp; Engrave',
    pr_desc:'From idea to finished part — we handle custom 3D printing, reverse engineering, and laser cutting &amp; engraving. Functional prototypes, one-off parts, and decorative work produced in-house.',
    pr_f1:'FDM 3D Printing', pr_f2:'Custom Designs',
    pr_f3:'Reverse Engineering', pr_f4:'Laser Cutting',
    pr_f5:'Laser Engraving', pr_f6:'PLA · PETG · ABS',
    pr_f7:'Wood · Acrylic · Metal', pr_f8:'Same-Day Prototyping',
    pr_cta1:'Get a Quote →', pr_cta2:'View All Projects',
    pr_off_label:'// What We Do',
    pr_off1_name:'Custom 3D Printing',
    pr_off1_text:'FDM printing in PLA, PETG, ABS, and specialty filaments. From functional brackets and enclosures to artistic objects — designed in SolidWorks and printed to spec.',
    pr_off2_name:'Reverse Engineering',
    pr_off2_text:'Broken or discontinued part? We measure, model, and print an exact replacement. Faster and cheaper than sourcing — with the option to improve on the original design.',
    pr_off3_name:'Laser Cutting',
    pr_off3_text:'Precision cuts on wood, acrylic, cardboard, leather, and thin metals. Clean edges, tight tolerances, and fast turnaround — ideal for parts, enclosures, and decorative panels.',
    pr_off4_name:'Laser Engraving',
    pr_off4_text:'Permanent marking on wood, anodised aluminium, leather, glass, and coated metals. Logos, serial numbers, artwork, personalised gifts — whatever the surface calls for.',
    pr_work_label:'// Our Work',
    pr_work_title:'Parts We\'ve Made',
    pr_work_sub:'Every project is designed, printed, or cut in-house — precise in execution, built to last.',
    pr_proj_1_name:'Automatic Cat Feeder',
    pr_proj_1_role:'3D Print · Custom Product Design',
    pr_proj_1_desc:'Fully custom-designed automated cat feeder — timed dispensing mechanism, ergonomic hopper, and easy-clean assembly. Every part modelled in SolidWorks and printed in PLA.',
    pr_proj_1_link:'Get in Touch',
    pr_proj_2_name:'Desk Fan',
    pr_proj_2_role:'3D Print · Product Design · Aerodynamics',
    pr_proj_2_desc:'Custom desktop fan with optimised blade geometry and compact housing — designed for quiet operation and maximum airflow. Fully 3D-printed assembly, motor-ready enclosure.',
    pr_proj_2_link:'Get in Touch',
    pr_proj_3_name:'Metal Wall Décor',
    pr_proj_3_role:'Laser Cut · Interior Design · Sheet Metal',
    pr_proj_3_desc:'Custom laser-cut steel wall décor — intricate patterns cut from sheet steel, powder-coated finish. Suitable for residential and commercial interiors. Custom sizes and motifs available.',
    pr_proj_3_link:'Get in Touch',
    pr_proj_4_name:'Dog Repellent Device',
    pr_proj_4_role:'3D Print · Electronics Enclosure · Custom Design',
    pr_proj_4_desc:'Compact ultrasonic dog repellent device — fully custom housing designed around the electronics. Weatherproof enclosure, clean fit, snap-close assembly. Reverse-engineered from client brief.',
    pr_proj_4_link:'Get in Touch',
    pr_cta_label:'// Let\'s Make Something',
    pr_cta_title:'Got a part<br>in mind?',
    pr_cta_text:'Send us a sketch, a broken part, or just a description. We\'ll design, print, or cut it — and deliver a finished piece ready to use.',
    pr_cta_price_from:'Starting from',
    pr_cta_btn1:'Get a Quote →',
    pr_cta_perk1:'✓ Custom design included', pr_cta_perk2:'✓ Fast turnaround', pr_cta_perk3:'✓ Reverse engineering available',
  }
};

/* ═══════════════════════════════════════════════════════════════
   LANGUAGE APPLY
═══════════════════════════════════════════════════════════════ */
let currentLang = 'en';

function applyLang(lang) {
  currentLang = lang;
  const t = LANG[lang];
  document.documentElement.lang = lang === 'el' ? 'el' : 'en';
  const set = (id, val, html=false) => { const el=document.getElementById(id); if(!el)return; html?el.innerHTML=val:el.textContent=val; };
  const isMob = window.innerWidth <= 640;
  const noArrow = v => (typeof v === 'string' && isMob) ? v.replace(/ →$/, '') : v;
  set('nav-about',t.nav_about); set('nav-projects',t.nav_projects);
  set('nav-software',t.nav_software); set('nav-webdesign',t.nav_webdesign); set('nav-3dprint',t.nav_3dprint); set('nav-experience',t.nav_experience); set('nav-contact',t.nav_contact);
  set('hero-tag',t.hero_tag); set('hero-title',t.hero_title);
  set('hero-desc',t.hero_desc,true);
  set('hero-cta-work',noArrow(t.hero_cta_work)); set('hero-cta-contact',noArrow(t.hero_cta_contact));
  set('stat-years',t.stat_years); set('stat-projects',t.stat_projects); set('stat-degrees',t.stat_degrees);

  set('edu-strip-title',t.edu_strip);
  set('edu1-deg',t.edu1_deg); set('edu1-name',t.edu1_name);
  set('edu2-deg',t.edu2_deg); set('edu2-name',t.edu2_name);
  set('edu3-deg',t.edu3_deg); set('edu3-name',t.edu3_name);
  set('edu4-deg',t.edu4_deg); set('edu4-name',t.edu4_name);
  set('edu5-deg',t.edu5_deg); set('edu5-name',t.edu5_name);
  set('about-heading',t.about_heading);
  set('about-quote',t.about_quote);
  set('about-p2',t.about_p2,true); set('about-p3',t.about_p3,true);
  set('about-p4',t.about_p4);
  set('val-1-title',t.val_1_title); set('val-1-text', isMob && t.val_1_text_mobile ? t.val_1_text_mobile : t.val_1_text);
  set('val-2-title',t.val_2_title); set('val-2-text', isMob && t.val_2_text_mobile ? t.val_2_text_mobile : t.val_2_text);
  set('val-3-title',t.val_3_title); set('val-3-text', isMob && t.val_3_text_mobile ? t.val_3_text_mobile : t.val_3_text);
  set('val-4-title',t.val_4_title); set('val-4-text', isMob && t.val_4_text_mobile ? t.val_4_text_mobile : t.val_4_text);
  set('about-bullets',t.about_bullets,true);
  set('proc-label',t.proc_label);
  set('proc-1-title',t.proc_1_title); set('proc-1-text',t.proc_1_text);
  set('proc-2-title',t.proc_2_title); set('proc-2-text',t.proc_2_text);
  set('proc-3-title',t.proc_3_title); set('proc-3-text',t.proc_3_text);
  set('principles-label',t.principles_label);
  set('prin-1-title',t.prin_1_title); set('prin-1-text', isMob && t.prin_1_text_mobile ? t.prin_1_text_mobile : t.prin_1_text, !isMob);
  set('prin-2-title',t.prin_2_title); set('prin-2-text', isMob && t.prin_2_text_mobile ? t.prin_2_text_mobile : t.prin_2_text, !isMob);
  set('prin-3-title',t.prin_3_title); set('prin-3-text', isMob && t.prin_3_text_mobile ? t.prin_3_text_mobile : t.prin_3_text, !isMob);
  set('prin-4-title',t.prin_4_title); set('prin-4-text',t.prin_4_text,true);
  set('team-heading',t.team_heading); set('team-page-heading',t.team_page_heading);
  const procExpEl = document.getElementById('proc-exp-text');
  if(procExpEl) { const yrs = new Date().getFullYear() - 2019; const wordsEn=['Zero','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve']; const wordsEl=['Μηδέν','Ένα','Δύο','Τρία','Τέσσερα','Πέντε','Έξι','Επτά','Οκτώ','Εννέα','Δέκα','Έντεκα','Δώδεκα']; const word = lang==='el' ? (wordsEl[yrs]||yrs) : (wordsEn[yrs]||yrs); procExpEl.textContent = (t.proc_exp_text||'').replace('{yrs}', word); }
  set('founder-name',t.founder_name,true);
  set('founder-label',t.founder_label,true); set('founder-bio',t.founder_bio);
  set('fcs-years',t.fcs_years); set('fcs-projects',t.fcs_projects);
  set('fcs-degrees',t.fcs_degrees); set('fcs-scholarships',t.fcs_scholarships);
  set('founder-profile-btn',noArrow(t.founder_profile_btn));
  // team.html specific
  set('founder-photo-accent',t.founder_photo_accent);
  set('founder-mono-label',t.founder_mono_label,true);
  set('founder-name-team',t.founder_name_team);
  set('founder-text',t.founder_text);
  set('edu-section-label',t.edu_section_label);
  set('edu-section-heading',t.edu_section_heading,true);
  set('val-integrity-text',t.val_integrity_text);
  set('val-innovation-text',t.val_innovation_text);
  // process flow (index.html + team.html) — translate all instances by position
  if(t.pf_labels){ document.querySelectorAll('.process-flow .pf-node').forEach((node,i)=>{ const lbl=node.querySelector('.pf-label'); if(lbl&&t.pf_labels[i]) lbl.textContent=t.pf_labels[i]; const sub=node.querySelector('.pf-sub'); if(sub&&t.pf_subs&&t.pf_subs[i]) sub.textContent=t.pf_subs[i]; }); }
  document.querySelectorAll('.pf-loop-label').forEach(el=>{ if(t.pf_loop) el.textContent=t.pf_loop; });
  // also update IDs for team.html
  if(t.pf_labels){ t.pf_labels.forEach((lbl,i)=>{ set('pf-label-'+(i+1),lbl); }); }
  if(t.pf_subs){   t.pf_subs.forEach((sub,i)=>{ set('pf-sub-'+(i+1),sub); }); }
  set('pf-loop-label',t.pf_loop);
  // ticker (index.html)
  const tickerEl = document.getElementById('tickerInner');
  if(tickerEl && t.ticker){ const items=t.ticker; let h=''; [0,1].forEach(()=>items.forEach(txt=>{ h+='<span class="ticker-item">'+txt+' <span>✦</span></span>'; })); tickerEl.innerHTML=h; }
  // 3dprint.html estimator
  set('pr-selfprint-badge',t.pr_selfprint_badge,true);
  set('pr-selfprint-title',t.pr_selfprint_title);
  set('pr-selfprint-sub',t.pr_selfprint_sub);
  set('pr-selfprint-cta',t.pr_selfprint_cta);
  set('pr-est-drop-or',t.pr_est_drop_or);
  set('pr-est-browse',t.pr_est_browse);
  set('pr-est-lbl-material',t.pr_est_lbl_material);
  set('pr-est-lbl-infill',t.pr_est_lbl_infill);
  set('pr-est-lbl-layer',t.pr_est_lbl_layer);
  set('pr-est-lbl-strength',t.pr_est_lbl_strength);
  set('pr-est-lbl-colour',t.pr_est_lbl_colour);
  set('pr-est-lbl-qty',t.pr_est_lbl_qty);
  set('pr-est-single-colour',t.pr_est_single_colour);
  set('pr-est-ams-toggle',t.pr_est_ams_toggle);
  set('pr-est-preview-empty',t.pr_est_preview_empty);
  set('pr-est-viewer-hint-text',t.pr_est_viewer_hint);
  set('pr-est-price-label',t.pr_est_price_label);
  set('pr-est-disclaimer',t.pr_est_disclaimer); set('pr-est-quote-link',t.pr_est_quote_link);
  // estimator material options
  const matSel = document.getElementById('prEstMaterial');
  if(matSel && t.pr_est_mat) { const vals=['pla','pla+','petg','abs']; vals.forEach(v=>{ const o=matSel.querySelector('option[value="'+v+'"]'); if(o) o.textContent=t.pr_est_mat[v]; }); }
  // infill buttons
  const infillMap = {'0.15':0,'0.20':1,'0.40':2,'1.00':3};
  document.querySelectorAll('.pr-est-infill-btn[data-infill]').forEach(b=>{ const idx=infillMap[b.dataset.infill]; if(t.pr_est_infill && t.pr_est_infill[idx]!==undefined) b.textContent=t.pr_est_infill[idx]; });
  // strength buttons
  const strengthMap = {'1.0':0,'1.1':1,'1.3':2,'1.5':3};
  document.querySelectorAll('.pr-est-strength-btn[data-strength]').forEach(b=>{ const idx=strengthMap[b.dataset.strength]; if(t.pr_est_strength && t.pr_est_strength[idx]!==undefined) b.textContent=t.pr_est_strength[idx]; });
  set('projects-heading',t.projects_heading);
  set('sw-heading',t.sw_heading); set('sw-label',t.sw_label);
  set('sw-desc',t.sw_desc);
  for(let i=1;i<=8;i++) set('sw-f'+i,t['sw_f'+i]);
  set('sw-cta1',noArrow(t.sw_cta1)); set('sw-cta2',noArrow(t.sw_cta2)); set('sw-cta3',noArrow(t.sw_cta3));
  set('sw-d-kicker1',t.sw_d_kicker1); set('sw-d-title',t.sw_d_title); set('sw-d-lead',t.sw_d_lead);
  set('sw-d-kicker2',t.sw_d_kicker2);
  for(let i=1;i<=6;i++) set('sw-wf'+i,t['sw_wf'+i]);
  set('sw-d-link',noArrow(t.sw_d_link));
  set('sw-d-kicker3',t.sw_d_kicker3);
  for(let c=1;c<=4;c++){ set('sw-fc'+c+'-name',t['sw_fc'+c+'_name']); for(let r=1;r<=4;r++) set('sw-fc'+c+'-'+r,t['sw_fc'+c+'_'+r]); }
  // webdesign.html
  set('wd-codebox-label',t.wd_codebox_label); set('wd-codebox-body',t.wd_codebox_body);
  set('wd-label',t.wd_label); set('wd-desc',t.wd_desc);
  for(let i=1;i<=8;i++) set('wd-f'+i,t['wd_f'+i]);
  set('wd-cta1',noArrow(t.wd_cta1)); set('wd-cta2',noArrow(t.wd_cta2));
  set('wd-off-label',t.wd_off_label);
  set('wd-off1-name',t.wd_off1_name); set('wd-off1-text',t.wd_off1_text);
  set('wd-off2-name',t.wd_off2_name); set('wd-off2-text',t.wd_off2_text);
  set('wd-off3-name',t.wd_off3_name); set('wd-off3-text',t.wd_off3_text);
  set('wd-off4-name',t.wd_off4_name); set('wd-off4-text',t.wd_off4_text);
  set('wd-why-label',t.wd_why_label);
  set('wd-why-bad-head',t.wd_why_bad_head); set('wd-why-good-head',t.wd_why_good_head);
  for(let i=1;i<=7;i++){ set('wd-why-bad-'+i,t['wd_why_bad_'+i]); set('wd-why-good-'+i,t['wd_why_good_'+i]); }
  set('wd-work-label',t.wd_work_label); set('wd-work-title',t.wd_work_title); set('wd-work-sub',t.wd_work_sub);
  set('wd-proj-1-name',t.wd_proj_1_name); set('wd-proj-1-role',t.wd_proj_1_role,true); set('wd-proj-1-desc',t.wd_proj_1_desc); set('wd-proj-1-link',t.wd_proj_1_link);
  set('wd-proj-2-name',t.wd_proj_2_name); set('wd-proj-2-role',t.wd_proj_2_role,true); set('wd-proj-2-desc',t.wd_proj_2_desc); set('wd-proj-2-link',t.wd_proj_2_link);
  set('wd-proj-3-name',t.wd_proj_3_name); set('wd-proj-3-role',t.wd_proj_3_role,true); set('wd-proj-3-desc',t.wd_proj_3_desc); set('wd-proj-3-link',t.wd_proj_3_link);
  set('wd-cta-label',t.wd_cta_label); set('wd-cta-title',t.wd_cta_title,true);
  set('wd-cta-text',t.wd_cta_text); set('wd-cta-price-from',t.wd_cta_price_from);
  set('wd-cta-btn1',noArrow(t.wd_cta_btn1)); set('wd-cta-btn2',noArrow(t.wd_cta_btn2));
  set('wd-cta-perk1',t.wd_cta_perk1); set('wd-cta-perk2',t.wd_cta_perk2); set('wd-cta-perk3',t.wd_cta_perk3);
  // 3dprint.html
  set('pr-label',t.pr_label); set('pr-title',t.pr_title,true); set('pr-desc',t.pr_desc,true);
  for(let i=1;i<=8;i++) set('pr-f'+i,t['pr_f'+i]);
  set('pr-cta1',noArrow(t.pr_cta1)); set('pr-cta2',noArrow(t.pr_cta2));
  set('pr-off-label',t.pr_off_label);
  set('pr-off1-name',t.pr_off1_name); set('pr-off1-text',t.pr_off1_text);
  set('pr-off2-name',t.pr_off2_name); set('pr-off2-text',t.pr_off2_text);
  set('pr-off3-name',t.pr_off3_name); set('pr-off3-text',t.pr_off3_text);
  set('pr-off4-name',t.pr_off4_name); set('pr-off4-text',t.pr_off4_text);
  set('pr-work-label',t.pr_work_label); set('pr-work-title',t.pr_work_title); set('pr-work-sub',t.pr_work_sub);
  set('pr-proj-1-name',t.pr_proj_1_name); set('pr-proj-1-role',t.pr_proj_1_role); set('pr-proj-1-desc',t.pr_proj_1_desc); set('pr-proj-1-link',t.pr_proj_1_link);
  set('pr-proj-2-name',t.pr_proj_2_name); set('pr-proj-2-role',t.pr_proj_2_role); set('pr-proj-2-desc',t.pr_proj_2_desc); set('pr-proj-2-link',t.pr_proj_2_link);
  set('pr-proj-3-name',t.pr_proj_3_name); set('pr-proj-3-role',t.pr_proj_3_role); set('pr-proj-3-desc',t.pr_proj_3_desc); set('pr-proj-3-link',t.pr_proj_3_link);
  set('pr-proj-4-name',t.pr_proj_4_name); set('pr-proj-4-role',t.pr_proj_4_role); set('pr-proj-4-desc',t.pr_proj_4_desc); set('pr-proj-4-link',t.pr_proj_4_link);
  set('pr-cta-label',t.pr_cta_label); set('pr-cta-title',t.pr_cta_title,true);
  set('pr-cta-text',t.pr_cta_text); set('pr-cta-price-from',t.pr_cta_price_from);
  set('pr-cta-btn1',noArrow(t.pr_cta_btn1));
  set('pr-cta-perk1',t.pr_cta_perk1); set('pr-cta-perk2',t.pr_cta_perk2); set('pr-cta-perk3',t.pr_cta_perk3);
  set('contact-label',t.contact_label); set('contact-heading',t.contact_heading,true);
  set('contact-sub',t.contact_sub);
  set('midcta-label',t.midcta_label); set('midcta-heading',t.midcta_heading); set('midcta-sub',t.midcta_sub); set('midcta-btn',t.midcta_btn);
  set('contact-label-static',t.contact_label_static); set('contact-heading-static',t.contact_heading_static); set('contact-sub-static',t.contact_sub_static);
  set('form-direct-label',t.form_direct_label);
  set('form-lbl-name',t.form_lbl_name); set('form-lbl-email',t.form_lbl_email);
  set('form-lbl-phone',t.form_lbl_phone); set('form-lbl-subject',t.form_lbl_subject); set('form-lbl-message',t.form_lbl_message);
  set('form-submit-label',t.form_submit_label);
  const phName = document.getElementById('form-ph-name'); if(phName) phName.placeholder = t.form_ph_name;
  const phMsg = document.getElementById('form-ph-message'); if(phMsg) phMsg.placeholder = t.form_ph_message;
  const sel = document.getElementById('form-select-subject');
  if(sel){ const opts = ['form-opt-default','form-opt-1','form-opt-2','form-opt-3','form-opt-4','form-opt-5','form-opt-6','form-opt-7'];
    const keys = ['form_opt_default','form_opt_1','form_opt_2','form_opt_3','form_opt_4','form_opt_5','form_opt_6','form_opt_7'];
    opts.forEach((id,i)=>{ const o=document.getElementById(id); if(o) o.textContent=t[keys[i]]; }); }
  set('footer-copy',t.footer_copy); set('footer-loc',t.footer_loc); set('footer-loc-bar',t.footer_loc_bar);
  document.querySelectorAll('.ec-ad-question').forEach(el => el.textContent = t.ec_ad_question);
  document.querySelectorAll('.ec-label').forEach(el => el.textContent = t.ec_label);
  document.querySelectorAll('.ec-ad-cta').forEach(el => { const arrow = el.querySelector('.ec-ad-arrow'); if(arrow){ el.firstChild.textContent = '\n        ' + t.ec_ad_cta + '\n        '; } else { el.textContent = t.ec_ad_cta; } });
  const mmap = {'mnav-about':t.nav_about,'mnav-projects':t.nav_projects,'mnav-software':t.nav_software,'mnav-webdesign':t.nav_webdesign,'mnav-3dprint':t.nav_3dprint,'mnav-experience':t.nav_experience,'mnav-contact':t.nav_contact};
  Object.entries(mmap).forEach(([id,val])=>{ const el=document.getElementById(id); if(el) el.textContent=val; });
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));
  localStorage.setItem('lang',lang);
  renderPortfolio();
}

/* ═══════════════════════════════════════════════════════════════
   PORTFOLIO DATA
═══════════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════
   PORTFOLIO — 2-COLUMN DYNAMIC
═══════════════════════════════════════════════════════════════ */
let portLeft  = 0;
let portRight = 1;
let portTimer = null;
const colImgIdx    = { portColLeft: 0, portColRight: 0 };
const colImgTimers = { portColLeft: null, portColRight: null };

let thumbScrollTimer = null;
let thumbScrollPaused = false;
let thumbScrollResumeTimer = null;

function updatePortDots() {
  document.querySelectorAll('.port-dot').forEach((d, i) => {
    d.classList.toggle('active', i === portLeft || i === portRight);
  });
}

function startColImageCycle(colEl, project) {
  const id = colEl.id;
  clearInterval(colImgTimers[id]);
  colImgIdx[id] = 0;
  if (project.images.length <= 1) return;
  colImgTimers[id] = setInterval(() => {
    colImgIdx[id] = (colImgIdx[id] + 1) % project.images.length;
    const img = colEl.querySelector('.port-img');
    if (!img) return;
    img.style.opacity = '0';
    setTimeout(() => { img.src = project.images[colImgIdx[id]]; img.style.opacity = '1'; }, 500);
  }, 5200);
}

function renderPortfolioCol(colEl, idx) {
  const p    = PORTFOLIO_DATA[idx];
  const lang = currentLang;
  colEl.classList.add('port-fade-out');
  setTimeout(() => {
    const img = colEl.querySelector('.port-img');
    if (img) { img.src = p.images[0]; img.alt = lang === 'el' ? p.titleEl : p.titleEn; img.style.opacity = '1'; }
    const badge = colEl.querySelector('.port-badge');
    if (badge) { const b = lang === 'el' ? p.badgeEl : p.badgeEn; badge.textContent = b; badge.style.display = b ? '' : 'none'; }
    const cat = colEl.querySelector('.port-cat');
    if (cat) cat.textContent = lang === 'el' ? p.catEl : p.catEn;
    const title = colEl.querySelector('.port-title');
    if (title) title.textContent = lang === 'el' ? p.titleEl : p.titleEn;
    const desc = colEl.querySelector('.port-desc');
    if (desc) desc.textContent = lang === 'el' ? p.descEl : p.descEn;
    const link = colEl.querySelector('.port-link');
    if (link) { link.href = p.link; const mob = window.innerWidth <= 640; link.textContent = lang === 'el' ? (mob ? 'Επικοινωνήστε' : 'Επικοινωνήστε →') : (mob ? 'Get in Touch' : 'Get in Touch →'); }
    colEl.classList.remove('port-fade-out');
    startColImageCycle(colEl, p);
  }, 500);
}

function buildPortThumbStrip() {
  const container = document.getElementById('portThumbStrip');
  if (!container) return;
  container.innerHTML = '';
  const lang = currentLang;
  const MIN_FOR_LOOP = 4;
  const shouldLoop = PORTFOLIO_DATA.length >= MIN_FOR_LOOP;

  function makeItem(p, i) {
    const item = document.createElement('button');
    item.className = 'port-thumb-item';
    item.dataset.idx = i;
    const title = lang === 'el' ? p.titleEl : p.titleEn;
    const num = String(i + 1).padStart(2, '0');
    item.innerHTML = `
      <div class="port-thumb-img-wrap">
        <img class="port-thumb-img" src="${p.images[0]}" alt="${title}" loading="lazy">
      </div>
      <div class="port-thumb-label">
        <span class="port-thumb-num">${num} &nbsp;</span>${title}
      </div>`;
    item.addEventListener('click', () => openProjectModal(i));
    return item;
  }

  clearInterval(thumbScrollTimer);

  if (shouldLoop) {
    const inner = document.createElement('div');
    inner.className = 'port-thumb-inner';
    // First set
    PORTFOLIO_DATA.forEach((p, i) => inner.appendChild(makeItem(p, i)));
    // Duplicate set for seamless loop
    PORTFOLIO_DATA.forEach((p, i) => inner.appendChild(makeItem(p, i)));
    container.appendChild(inner);
    startThumbAutoScroll(container);
  } else {
    PORTFOLIO_DATA.forEach((p, i) => container.appendChild(makeItem(p, i)));
  }

  container.addEventListener('mouseenter',  () => setThumbPaused(true));
  container.addEventListener('mouseleave',  () => setThumbPaused(false, 1200));
  container.addEventListener('touchstart',  () => setThumbPaused(true),        { passive: true });
  container.addEventListener('touchend',    () => setThumbPaused(false, 1800), { passive: true });
  container.addEventListener('touchcancel', () => setThumbPaused(false, 1800), { passive: true });
}

function startThumbAutoScroll(container) {
  thumbScrollTimer = setInterval(() => {
    if (thumbScrollPaused) return;
    container.scrollLeft += 1;
    const inner = container.querySelector('.port-thumb-inner');
    if (inner && container.scrollLeft >= inner.scrollWidth / 2) {
      container.scrollLeft -= inner.scrollWidth / 2;
    }
  }, 16);
}

function setThumbPaused(val, resumeAfterMs) {
  thumbScrollPaused = val;
  clearTimeout(thumbScrollResumeTimer);
  if (val && resumeAfterMs) {
    thumbScrollResumeTimer = setTimeout(() => { thumbScrollPaused = false; }, resumeAfterMs);
  }
}

function initThumbNavButtons() {
  const strip = document.getElementById('portThumbStrip');
  const prev  = document.getElementById('portThumbPrev');
  const next  = document.getElementById('portThumbNext');
  if (!strip || !prev || !next) return;
  const scrollAmt = 304; // ~2 items (138px + 14px gap = 152px × 2)

  prev.addEventListener('click', () => {
    setThumbPaused(true, 2000);
    const inner = strip.querySelector('.port-thumb-inner');
    if (inner && strip.scrollLeft < scrollAmt + 50) {
      // Jump to equivalent position in second copy so we have room to scroll left
      strip.scrollLeft = inner.scrollWidth / 2 + strip.scrollLeft;
    }
    strip.scrollBy({ left: -scrollAmt, behavior: 'smooth' });
  });

  next.addEventListener('click', () => {
    setThumbPaused(true, 2000);
    strip.scrollBy({ left: scrollAmt, behavior: 'smooth' });
  });
}

function setThumbActive(idx) {
  document.querySelectorAll('.port-thumb-item').forEach(el => {
    el.classList.toggle('active', Number(el.dataset.idx) === idx);
  });
}

function renderPortfolio() {
  const L = document.getElementById('portColLeft');
  const R = document.getElementById('portColRight');
  if (L) renderPortfolioCol(L, portLeft);
  if (R) renderPortfolioCol(R, portRight);
  updatePortDots();
  buildPortThumbStrip();
}

function swapPortCols() {
  const tmp = portLeft; portLeft = portRight; portRight = tmp;
  renderPortfolio();
  resetPortTimer();
}

function resetPortTimer() { clearInterval(portTimer); setTimeout(startPortTimer, 400); }

function startPortTimer() {
  portTimer = setInterval(() => {
    const available = PORTFOLIO_DATA.map((_,i) => i).filter(i => i !== portLeft && i !== portRight);
    const newIdx = available[Math.floor(Math.random() * available.length)];
    if (Math.random() < 0.5) {
      portLeft = newIdx;
      const el = document.getElementById('portColLeft');
      if (el) renderPortfolioCol(el, portLeft);
    } else {
      portRight = newIdx;
      const el = document.getElementById('portColRight');
      if (el) renderPortfolioCol(el, portRight);
    }
    updatePortDots();
  }, 7000);
}

function nextProjectForColumn(colId) {
  const current = colId === 'portColLeft' ? portLeft : portRight;
  const other = colId === 'portColLeft' ? portRight : portLeft;
  let available = PORTFOLIO_DATA.map((_, i) => i).filter(i => i !== current && i !== other);
  if (available.length === 0) {
    available = PORTFOLIO_DATA.map((_, i) => i).filter(i => i !== current);
  }
  const next = available[Math.floor(Math.random() * available.length)];
  if (colId === 'portColLeft') portLeft = next;
  else portRight = next;
  renderPortfolio();
  resetPortTimer();
}


function initPortDots() {
  const container = document.getElementById('portDots');
  if (!container) return;
  container.innerHTML = '';
  PORTFOLIO_DATA.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'port-dot';
    d.dataset.idx = i;
    d.setAttribute('aria-label', 'Project ' + (i + 1));
    d.addEventListener('click', () => {
      if (portLeft === i || portRight === i) return;
      portLeft = i;
      const el = document.getElementById('portColLeft');
      if (el) renderPortfolioCol(el, portLeft);
      updatePortDots();
      resetPortTimer();
    });
    container.appendChild(d);
  });
}

function initPortDrag() {
  const leftEl  = document.getElementById('portColLeft');
  const rightEl = document.getElementById('portColRight');
  if (!leftEl || !rightEl) return;
  let activeCol = null, startX = 0, currentDx = 0, hasDragged = false;

  const onDown = (col, clientX) => {
    activeCol = col; startX = clientX; currentDx = 0; hasDragged = false;
    col.style.transition = 'transform .1s ease, opacity .28s ease';
  };
  const onMove = (clientX) => {
    if (!activeCol) return;
    currentDx = clientX - startX;
    if (Math.abs(currentDx) > 6) hasDragged = true;
    if (hasDragged) activeCol.style.transform = `translateX(${currentDx * 0.22}px)`;
  };
  const onUp = () => {
    if (!activeCol) return;
    activeCol.style.transition = 'transform .35s cubic-bezier(.19,1,.22,1), opacity .28s ease';
    activeCol.style.transform = '';
    const isLeft = activeCol.id === 'portColLeft';
    if (hasDragged) {
      if (isLeft  && currentDx >  90) swapPortCols();
      if (!isLeft && currentDx < -90) swapPortCols();
    }
    activeCol = null; hasDragged = false; currentDx = 0;
  };

  [leftEl, rightEl].forEach(col => {
    col.addEventListener('mousedown',  e => { if (e.button === 0) onDown(col, e.clientX); });
    col.addEventListener('touchstart', e => onDown(col, e.touches[0].clientX), {passive:true});
  });
  document.addEventListener('mousemove', e => onMove(e.clientX));
  document.addEventListener('touchmove', e => { if (activeCol) onMove(e.touches[0].clientX); }, {passive:true});
  document.addEventListener('mouseup',   onUp);
  document.addEventListener('touchend',  onUp, {passive:true});
}

/* ═══════════════════════════════════════════════════════════════
   PROJECT MODAL
═══════════════════════════════════════════════════════════════ */
let modalImgIdx = 0;
let modalProject = null;
let cflowIdx    = 0;
let cflowImages = [];
let cflowDragging = false;

function buildProjectModal() {
  if (document.getElementById('portModal')) return;
  const m = document.createElement('div');
  m.id = 'portModal';
  m.className = 'port-modal';
  m.innerHTML = `
    <div class="port-modal-backdrop"></div>
    <div class="port-modal-panel">
      <button class="port-modal-close" id="portModalClose" aria-label="Close">✕</button>
      <div class="port-modal-gallery">
        <button class="port-modal-nav port-modal-prev" id="portModalPrev">‹</button>
        <img class="port-modal-img" id="portModalImg" src="" alt="">
        <button class="port-modal-nav port-modal-next" id="portModalNext">›</button>
        <div class="port-modal-img-counter" id="portModalCounter"></div>
        <div class="cflow-stage" id="cflowStage"></div>
      </div>
      <div class="port-modal-dots-row" id="portModalDots"></div>
      <div class="port-modal-info">
        <div class="port-modal-cat"  id="portModalCat"></div>
        <h2  class="port-modal-title" id="portModalTitle"></h2>
        <p   class="port-modal-desc"  id="portModalDesc"></p>
      </div>
    </div>`;
  document.body.appendChild(m);

  document.getElementById('portModalClose').addEventListener('click', closeProjectModal);
  m.querySelector('.port-modal-backdrop').addEventListener('click', closeProjectModal);
  document.getElementById('portModalPrev').addEventListener('click', () => modalNav(-1));
  document.getElementById('portModalNext').addEventListener('click', () => modalNav(+1));
  document.addEventListener('keydown', e => {
    if (!m.classList.contains('open')) return;
    if (e.key === 'Escape')      closeProjectModal();
    if (e.key === 'ArrowLeft')  modalNav(-1);
    if (e.key === 'ArrowRight') modalNav(+1);
  });

  // Touch swipe — desktop: snap on release; mobile: live coverflow drag
  const gallery = m.querySelector('.port-modal-gallery');
  let touchStartX = 0;
  let touchActive = false;
  gallery.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchActive = true;
    const stage = document.getElementById('cflowStage');
    if (stage) stage.querySelectorAll('.cflow-card').forEach(c => c.classList.remove('cflow-snap'));
  }, { passive: true });
  gallery.addEventListener('touchmove', e => {
    if (!touchActive || window.innerWidth > 768) return;
    const dx = e.touches[0].clientX - touchStartX;
    const stage = document.getElementById('cflowStage');
    const w = stage ? stage.offsetWidth * 0.74 : 220;
    cflowRender(-(dx / w));
  }, { passive: true });
  gallery.addEventListener('touchend', e => {
    if (!touchActive) return;
    touchActive = false;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (window.innerWidth <= 768) {
      const stage = document.getElementById('cflowStage');
      const w = stage ? stage.offsetWidth * 0.74 : 220;
      const progress = -(dx / w);
      if (progress > 0.28 && cflowIdx < cflowImages.length - 1) modalNav(1);
      else if (progress < -0.28 && cflowIdx > 0) modalNav(-1);
      else cflowGoTo(cflowIdx);
    } else {
      if (Math.abs(dx) > 40) modalNav(dx < 0 ? 1 : -1);
    }
  }, { passive: true });

  // Horizontal wheel / trackpad swipe
  let wheelCooldown = false;
  gallery.addEventListener('wheel', e => {
    if (wheelCooldown) return;
    const delta = Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 20) return;
    e.preventDefault();
    modalNav(delta > 0 ? 1 : -1);
    wheelCooldown = true;
    setTimeout(() => { wheelCooldown = false; }, 350);
  }, { passive: false });
}

/* ── MOBILE PEEK CAROUSEL (iOS Photos style) ─────────────────── */
function cflowCardTransform(offset, stageW) {
  const absOff = Math.abs(offset);
  const tx     = offset * (stageW * 0.74); // ~16% of adjacent card peeks at each side
  const scale  = Math.max(0.86, 1 - absOff * 0.08);
  const opacity = Math.max(0, 1 - absOff * 0.52);
  return { tx, scale, opacity };
}

function cflowRender(dragOffset) {
  const stage = document.getElementById('cflowStage');
  if (!stage) return;
  const stageW = stage.offsetWidth || 300;
  stage.querySelectorAll('.cflow-card').forEach((card, i) => {
    const offset = i - cflowIdx - (dragOffset || 0);
    const { tx, scale, opacity } = cflowCardTransform(offset, stageW);
    card.style.transform = `translateX(${tx.toFixed(1)}px) scale(${scale.toFixed(3)})`;
    card.style.opacity   = opacity.toFixed(3);
    card.style.zIndex    = Math.round(100 - Math.abs(offset) * 18);
  });
}

function buildCflowCards(images) {
  const stage = document.getElementById('cflowStage');
  if (!stage) return;
  stage.innerHTML = '';
  cflowImages = images;
  cflowIdx    = 0;
  images.forEach((src, i) => {
    const card = document.createElement('div');
    card.className = 'cflow-card';
    const img = document.createElement('img');
    img.src = src; img.alt = '';
    card.appendChild(img);
    card.addEventListener('click', () => { if (Math.abs(i - cflowIdx) >= 0.5) cflowGoTo(i); });
    stage.appendChild(card);
  });
  cflowRender(0);
}

function cflowGoTo(idx) {
  const stage = document.getElementById('cflowStage');
  if (!stage) return;
  cflowIdx = Math.max(0, Math.min(cflowImages.length - 1, idx));
  stage.querySelectorAll('.cflow-card').forEach(c => c.classList.add('cflow-snap'));
  cflowRender(0);
  setTimeout(() => {
    const s = document.getElementById('cflowStage');
    if (s) s.querySelectorAll('.cflow-card').forEach(c => c.classList.remove('cflow-snap'));
  }, 460);
  modalImgIdx = cflowIdx;
  const counter = document.getElementById('portModalCounter');
  if (counter) counter.textContent = `${cflowIdx + 1} / ${cflowImages.length}`;
  document.querySelectorAll('.port-modal-dot').forEach((d, i) => d.classList.toggle('active', i === cflowIdx));
}

function openProjectModal(projectIdx) {
  modalProject = PORTFOLIO_DATA[projectIdx];
  modalImgIdx  = 0;
  const lang = currentLang;
  document.getElementById('portModalCat').textContent   = lang === 'el' ? modalProject.catEl   : modalProject.catEn;
  document.getElementById('portModalTitle').textContent = lang === 'el' ? modalProject.titleEl : modalProject.titleEn;
  document.getElementById('portModalDesc').textContent  = lang === 'el' ? modalProject.descEl  : modalProject.descEn;
  buildModalDots();
  if (window.innerWidth <= 768) buildCflowCards(modalProject.images);
  modalSetImage(0);
  setThumbActive(projectIdx);
  const m = document.getElementById('portModal');
  m.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const m = document.getElementById('portModal');
  if (m) m.classList.remove('open');
  document.body.style.overflow = '';
}

function buildModalDots() {
  const container = document.getElementById('portModalDots');
  if (!container || !modalProject) return;
  container.innerHTML = '';
  modalProject.images.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'port-modal-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Image ' + (i + 1));
    d.addEventListener('click', () => modalSetImage(i));
    container.appendChild(d);
  });
}

function modalSetImage(idx) {
  if (!modalProject) return;
  modalImgIdx = (idx + modalProject.images.length) % modalProject.images.length;
  if (window.innerWidth <= 768) { cflowGoTo(modalImgIdx); return; }
  const img = document.getElementById('portModalImg');
  img.style.opacity = '0';
  setTimeout(() => {
    img.src = modalProject.images[modalImgIdx];
    img.alt = '';
    img.style.opacity = '1';
  }, 180);
  document.getElementById('portModalCounter').textContent = `${modalImgIdx + 1} / ${modalProject.images.length}`;
  document.querySelectorAll('.port-modal-dot').forEach((d, i) => d.classList.toggle('active', i === modalImgIdx));
  const prev = document.getElementById('portModalPrev');
  const next = document.getElementById('portModalNext');
  if (prev) prev.disabled = modalImgIdx === 0;
  if (next) next.disabled = modalImgIdx === modalProject.images.length - 1;
}

function modalNav(dir) {
  if (!modalProject) return;
  const newIdx = modalImgIdx + dir;
  if (newIdx < 0 || newIdx >= modalProject.images.length) return;
  modalSetImage(newIdx);
}

function addPortImageClickHandlers() {
  ['portColLeft', 'portColRight'].forEach(colId => {
    const colEl = document.getElementById(colId);
    if (!colEl) return;
    const imgWrap = colEl.querySelector('.port-image-wrap');
    if (!imgWrap) return;

    imgWrap.addEventListener('click', () => {
      const idx = colId === 'portColLeft' ? portLeft : portRight;
      openProjectModal(idx);
    });

    colEl.querySelectorAll('a, button, .project-link').forEach(el => {
      el.addEventListener('mouseenter', () => colEl.classList.add('port-hover'));
      el.addEventListener('mouseleave', () => colEl.classList.remove('port-hover'));
    });
  });
}

function initPortfolio() {
  initPortDots();
  renderPortfolio();
  initPortDrag();
  addPortImageClickHandlers();
  initThumbNavButtons();
  setTimeout(startPortTimer, 3200);
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════════════════════════ */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal-up');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
    });
  }, { threshold: 0.10 });
  els.forEach(el => io.observe(el));
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL
═══════════════════════════════════════════════════════════════ */
function initScroll() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a[href^="#"]');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 140) cur = s.id; });
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
  });
}

function initHeroExplode() {
  const hero     = document.getElementById('hero');
  const heroLeft = hero ? hero.querySelector('.hero-left') : null;
  const canvas   = document.getElementById('hero3d');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const heroH = hero.offsetHeight;
    const st    = window.scrollY;
    const isMob = window.innerWidth <= 960;

    if (isMob) {
      /* Drive explode/assemble directly from scroll position in both directions —
         fully assembled only at top (st=0), fully exploded at 65% of hero height */
      const progress = Math.max(0, Math.min(1, st / (heroH * 0.65)));
      if (typeof setScrollExplode === 'function') setScrollExplode(progress);

      /* Canvas: full opacity inside hero, subtle outside */
      if (canvas) {
        canvas.style.opacity = st < heroH ? '0.62' : '0.28';
      }

      /* Hero text stays visible so text and explosion are seen together */
      if (heroLeft) {
        heroLeft.style.opacity = '1';
      }
    } else {
      /* Desktop: original behaviour — explode only within hero */
      const progress = Math.max(0, Math.min(1, st / (heroH * 0.55)));
      if (typeof setScrollExplode === 'function') setScrollExplode(progress);
      if (heroLeft) {
        const fade = Math.max(0, 1 - Math.max(0, progress - 0.25) / 0.5);
        heroLeft.style.opacity = fade;
      }
    }
  }, { passive: true });
}

/* ═══════════════════════════════════════════════════════════════
   MOBILE NAV
═══════════════════════════════════════════════════════════════ */
function initMobileNav() {
  const btn=document.getElementById('navHamburger'), drawer=document.getElementById('navMobile');
  if(!btn||!drawer)return;
  btn.addEventListener('click',()=>{btn.classList.toggle('open');drawer.classList.toggle('open');});
  window.addEventListener('scroll',()=>{ if(drawer.classList.contains('open')) closeMobileNav(); },{passive:true});
}
function closeMobileNav() {
  const btn=document.getElementById('navHamburger'),drawer=document.getElementById('navMobile');
  if(btn)btn.classList.remove('open');if(drawer)drawer.classList.remove('open');
}

/* ═══════════════════════════════════════════════════════════════
   PROCESS FLOW ANIMATION — activate only when section is visible
═══════════════════════════════════════════════════════════════ */
function initProcessAnimations() {
  const proc = document.getElementById('process');
  if (!proc) return;
  new IntersectionObserver(entries => {
    proc.classList.toggle('anim-active', entries[0].isIntersecting);
  }, { threshold: 0.05 }).observe(proc);
}

/* ═══════════════════════════════════════════════════════════════
   BOOT
═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.lang-btn').forEach(b => b.addEventListener('click', () => applyLang(b.dataset.lang)));
  applyLang(localStorage.getItem('lang') || 'en');
  initScroll();
  initHeroExplode();
  initPortfolio();
  buildProjectModal();
  initMobileNav();
  initScrollReveal();
  initProcessAnimations();
  if (typeof initThree === 'function') setTimeout(initThree, 120);
});
