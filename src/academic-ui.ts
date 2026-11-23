import {activityById,academicNodes,activitiesForNode,nextActivityForNode,type AcademicLearningStatus,type ActivityDefinition,type LearnerActivityRecord} from './academic-data.js';
import {chapters,subjects,subjectById} from './curriculum.js';
import {type State,ratings,type Status} from './model.js';
import {esc} from './host.js';
import {icon} from './icons.js';
import {cbseChapterWeightageMap} from './performance-engine.js';

const topicStatus:[AcademicLearningStatus,string][]=[['not-started','Not started'],['learning','Learning'],['learned','Initial learning complete'],['practice-needed','Practice needed'],['revision-due','Revision due'],['assessment-ready','Assessment ready'],['needs-work','Needs further work']];
const option=(value:string,label:string,current='')=>`<option value="${esc(value)}"${value===current?' selected':''}>${esc(label)}</option>`;
const button=(action:string,label:string,kind='quiet',value='')=>`<button type="button" class="button ${kind}" data-action="${action}" data-value="${esc(value)}">${esc(label)}</button>`;
const subhead=(eyebrow:string,title:string,copy='')=>`<div class="section-head intro"><div><p class="eyebrow">${esc(eyebrow)}</p><h1>${esc(title)}</h1>${copy?`<p class="muted">${esc(copy)}</p>`:''}</div></div>`;

function sourceBlock(title:string,url:string,page?:number){const ref=page?`#page=${page}`:'';return `<details class="source-detail"><summary>Source record</summary><a href="${url}${ref}" target="_blank" rel="noreferrer">${esc(title)}${page?' · PDF page '+page:''} ${icon('arrow-up-right')}</a></details>`;}

function topicCard(node:typeof academicNodes[number],state:State){
  const progress=state.academic.topicProgress[node.id],activity=nextActivityForNode(node.id,progress,state.academic.activities),chapterTasks=state.tasks.filter(task=>task.chapter===node.chapterId),hasLegacyStudyRecord=Object.hasOwn(state.progress,node.chapterId)||chapterTasks.length>0;
  const label=progress?topicStatus.find(([value])=>value===progress.status)?.[1]??progress.status:'Unmarked · unknown';
  const rating=progress?.rating;
  return `<article class="topic-card" data-topic-card="${esc(node.id)}">
    <div class="topic-card-head">
      <div>
        <p class="eyebrow">VERIFIED TOPIC</p>
        <h3>${esc(node.title)}</h3>
      </div>
      <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
        <span class="status ${progress?'marked':''}">${esc(label)}</span>
        ${rating?`<span class="topic-rating-tag rating-${rating.toLowerCase()}">★ ${rating}</span>`:''}
      </div>
    </div>
    <p class="topic-scope">${esc(node.officialScope)}</p>
    ${sourceBlock(node.source.title,node.source.url,node.source.pdfPage)}
    ${hasLegacyStudyRecord&&!progress?`<p class="academic-note">Your existing chapter record or task was preserved. Link it to this topic only if you choose; it does not auto-fill this topic status.</p>`:''}
    
    <!-- 1-Click Fast Topic Status & Clarity Bar -->
    <div class="topic-fast-controls">
      <div class="topic-control-row">
        <span class="topic-control-title">Status:</span>
        <div class="topic-pill-group">
          <button type="button" class="topic-status-pill ${progress?.status==='not-started'?'active':''}" data-action="quick-topic-status" data-topic="${esc(node.id)}" data-status="not-started">⚪ Not started</button>
          <button type="button" class="topic-status-pill ${progress?.status==='learning'?'active':''}" data-action="quick-topic-status" data-topic="${esc(node.id)}" data-status="learning">✍️ Learning</button>
          <button type="button" class="topic-status-pill ${progress?.status==='learned'||progress?.status==='assessment-ready'?'active':''}" data-action="quick-topic-status" data-topic="${esc(node.id)}" data-status="learned">✓ Learned</button>
          <button type="button" class="topic-status-pill ${progress?.status==='practice-needed'?'active':''}" data-action="quick-topic-status" data-topic="${esc(node.id)}" data-status="practice-needed">🔄 Practice</button>
          <button type="button" class="topic-status-pill ${progress?.status==='revision-due'||progress?.status==='needs-work'?'active':''}" data-action="quick-topic-status" data-topic="${esc(node.id)}" data-status="revision-due">⚠️ Revision</button>
        </div>
      </div>
      <div class="topic-control-row">
        <span class="topic-control-title">Clarity:</span>
        <div class="topic-diff-group">
          <button type="button" class="diff-btn diff-easy ${rating==='Easy'?'active':''}" data-action="quick-topic-rating" data-topic="${esc(node.id)}" data-rating="Easy">🟢 Easy</button>
          <button type="button" class="diff-btn diff-okay ${rating==='Okay'?'active':''}" data-action="quick-topic-rating" data-topic="${esc(node.id)}" data-rating="Okay">🟡 Okay</button>
          <button type="button" class="diff-btn diff-difficult ${rating==='Difficult'?'active':''}" data-action="quick-topic-rating" data-topic="${esc(node.id)}" data-rating="Difficult">🔴 Difficult</button>
          ${rating?`<button type="button" class="button quiet topic-diff-clear" data-action="quick-topic-rating" data-topic="${esc(node.id)}" data-rating="" title="Clear clarity rating">✕</button>`:''}
        </div>
      </div>
    </div>

    <!-- Collapsible Advanced Status Dropdown for Full Taxonomy -->
    <details class="topic-advanced-state">
      <summary>Full status dropdown (optional)</summary>
      <div class="topic-state-edit">
        <label>Status<select data-topic-status="${esc(node.id)}">${option('',progress?'Keep current status':'Choose a status',progress?'__keep':'')}${topicStatus.map(([value,name])=>option(value,name,progress?.status)).join('')}</select></label>
        ${button('save-topic-status','Save status','outline',node.id)}
      </div>
    </details>

    ${activity?`<div class="next-activity-card"><div><p class="eyebrow">NEXT ACTIVITY · ${esc(activity.kind.replaceAll('-',' '))}</p><h4>${esc(activity.title)}</h4><p>${esc(activity.objective)}</p><small>${activity.estimatedMinutes} min · ${progress?.rating?'Last rating: '+progress.rating:'No understanding rating yet'}</small></div>${button('launch-activity','Open workspace','primary',activity.id)}</div>`:`<p class="academic-note">${progress?'No further activity is queued from this status and recorded activity. You can update the status or revisit later.':'Record a topic status before BLOOM recommends an activity. Unmarked does not mean unlearned.'}</p>`}
  </article>`;
}

export function renderAcademicHub(subjectId:string,selectedChapterId:string,state:State,selectedSet:Set<string>=new Set()):string{
  const selectedSubject=subjectById(subjectId)??subjects[0],list=chapters.filter(chapter=>chapter.subject===selectedSubject.id),selected=list.find(chapter=>chapter.id===selectedChapterId)??list[0];
  const nodes=academicNodes.filter(node=>node.chapterId===selected.id&&(node.kind==='topic'||node.kind==='concept')),fullyTranscribed=nodes.length>0;
  const assigned=nodes.length,marked=nodes.filter(node=>state.academic.topicProgress[node.id]).length;
  const currentUnit=selected.allocation;
  const currentChapterStatus=state.progress[selected.id]?.status??'Unmarked';
  const currentChapterRating=state.progress[selected.id]?.rating;
  const weightMarks=cbseChapterWeightageMap[selected.id]??5;
  const markedChaptersCount=list.filter(c=>state.progress[c.id]).length;

  // Status indicator styling
  const statusColors:Record<string,{bg:string;color:string;label:string}>={
    'Exam Ready':{bg:'#dcfce7',color:'#15803d',label:'🌟 Exam Ready'},
    'Completed':{bg:'#dcfce7',color:'#15803d',label:'✓ Completed'},
    'Practising':{bg:'#e0f2fe',color:'#0369a1',label:'🔄 Practising'},
    'Revised':{bg:'#e0f2fe',color:'#0369a1',label:'📖 Revised'},
    'Learning':{bg:'#e0f2fe',color:'#0369a1',label:'✍️ Learning'},
    'Needs revision':{bg:'#fef3c7',color:'#b45309',label:'⚠️ Needs Revision'},
    'Needs work':{bg:'#fef3c7',color:'#b45309',label:'⚠️ Needs Work'},
    'Pending':{bg:'#f1f5f9',color:'#64748b',label:'⚪ Not Started'},
    'Unmarked':{bg:'#f1f5f9',color:'#64748b',label:'⚪ Unmarked'}
  };
  const currentStyle=statusColors[currentChapterStatus]??statusColors['Unmarked'];

  const studioBadge = selectedSubject.id === 'physics'
    ? `<a href="#derivations" class="academic-hub-studio-badge" title="Open Derivations Lab">🔬 Derivations</a>`
    : selectedSubject.id === 'chemistry'
    ? `<a href="#roadmaps" class="academic-hub-studio-badge" title="Open Reaction Roadmaps">🧪 Roadmaps</a>`
    : selectedSubject.id === 'math'
    ? `<a href="#derivations" class="academic-hub-studio-badge" title="Open Math Proofs">📐 Proofs</a>`
    : selectedSubject.id === 'english'
    ? `<a href="#english-studio" class="academic-hub-studio-badge" title="Open English Studio">✍️ Literature</a>`
    : selectedSubject.id === 'pe'
    ? `<a href="#pe-studio" class="academic-hub-studio-badge" title="Open PE Fixtures">🏆 Fixtures</a>`
    : '';

  const left=`<aside class="academic-chapters">
    <div class="academic-chapters-head">
      <div>
        <div style="display:flex;align-items:center;gap:8px;">
          <h2>${esc(selectedSubject.title)}</h2>
          ${studioBadge}
        </div>
        <p class="muted">${markedChaptersCount} of ${list.length} chapters marked</p>
      </div>
      <button type="button" class="button quiet outline academic-batch-toggle-btn ${selectedSet.size?'active':''}" data-action="toggle-academic-batch">
        ${selectedSet.size ? `${selectedSet.size} Selected` : '☑ Batch Select'}
      </button>
    </div>

    ${selectedSet.size > 0 ? `
    <div class="academic-batch-bar" role="toolbar" aria-label="Batch actions for selected chapters">
      <div class="academic-batch-info">
        <strong>${selectedSet.size} selected</strong>
        <button type="button" class="batch-select-all-btn" data-action="academic-select-all">${selectedSet.size === list.length ? 'Clear all' : 'Select all'}</button>
      </div>
      <div class="academic-batch-btns">
        <button type="button" class="bulk-diff-pill diff-difficult" data-action="academic-batch-rating" data-rating="Difficult" title="Mark selected chapters as Difficult">🔴 Difficult</button>
        <button type="button" class="bulk-diff-pill diff-okay" data-action="academic-batch-rating" data-rating="Okay" title="Mark selected chapters as Okay">🟡 Okay</button>
        <button type="button" class="bulk-diff-pill diff-easy" data-action="academic-batch-rating" data-rating="Easy" title="Mark selected chapters as Easy">🟢 Easy</button>
        <button type="button" class="bulk-diff-pill bulk-status-btn" data-action="academic-batch-status" data-status="Exam Ready">🌟 Exam Ready</button>
        <button type="button" class="bulk-diff-pill bulk-status-btn" data-action="academic-batch-status" data-status="Needs revision">⚠️ Needs Rev</button>
      </div>
    </div>
    ` : ''}

    <div class="academic-chapters-list">
      ${list.map(chapter=>{
        const p=state.progress[chapter.id];
        const st=p?.status??'Unmarked';
        const rating=p?.rating;
        const sc=statusColors[st]??statusColors['Unmarked'];
        const wm=cbseChapterWeightageMap[chapter.id]??5;
        const isCurrent=chapter.id===selected.id;
        const isChecked=selectedSet.has(chapter.id);
        return `<div class="academic-chapter-card ${isCurrent?'selected':''} ${isChecked?'is-batch-checked':''}">
          ${selectedSet.size ? `
          <label class="chapter-card-check" onclick="event.stopPropagation();" title="Select for batch action">
            <input type="checkbox" data-select-academic="${chapter.id}" ${isChecked?'checked':''}>
          </label>` : ''}
          <button type="button" class="academic-chapter-body" data-action="academic-chapter" data-value="${esc(chapter.id)}">
            <div class="chapter-card-top-row">
              <strong class="chapter-card-title">${esc(chapter.title)}</strong>
              <span class="chapter-card-marks">${wm}M</span>
            </div>
            <div class="chapter-card-bottom-row">
              <small class="chapter-card-sub">${esc(chapter.allocation)}</small>
              <span class="chapter-card-status" style="background:${sc.bg};color:${sc.color};">${sc.label}</span>
            </div>
          </button>
          <div class="chapter-card-mini-diff" onclick="event.stopPropagation();" title="Quick Rate Difficulty">
            ${rating?`<span class="mini-rating-tag rating-${rating.toLowerCase()}">★ ${rating}</span>`:''}
            <div class="mini-diff-chips-row">
              <button type="button" class="mini-diff-chip diff-easy ${rating==='Easy'?'active':''}" data-action="quick-chapter-rating" data-chapter="${chapter.id}" data-rating="Easy" title="Set Easy">🟢</button>
              <button type="button" class="mini-diff-chip diff-okay ${rating==='Okay'?'active':''}" data-action="quick-chapter-rating" data-chapter="${chapter.id}" data-rating="Okay" title="Set Okay">🟡</button>
              <button type="button" class="mini-diff-chip diff-difficult ${rating==='Difficult'?'active':''}" data-action="quick-chapter-rating" data-chapter="${chapter.id}" data-rating="Difficult" title="Set Difficult">🔴</button>
            </div>
          </div>
        </div>`;
      }).join('')}
    </div>
  </aside>`;

  const chapterSource=academicNodes.find(node=>node.id===selected.id&&node.kind==='chapter')?.source;

  // Studio Quick-Jump helper based on subject
  let studioShortcuts = '';
  if (selectedSubject.id === 'physics') {
    studioShortcuts = `<a href="#derivations" class="button outline" style="font-size:0.8rem;padding:0.4rem 0.85rem;min-height:38px;display:inline-flex;align-items:center;gap:6px;">${icon('book-open')} Derivations Lab</a><a href="#formulas" class="button outline" style="font-size:0.8rem;padding:0.4rem 0.85rem;min-height:38px;display:inline-flex;align-items:center;gap:6px;">${icon('copy')} Formulas</a>`;
  } else if (selectedSubject.id === 'chemistry') {
    studioShortcuts = `<a href="#roadmaps" class="button outline" style="font-size:0.8rem;padding:0.4rem 0.85rem;min-height:38px;display:inline-flex;align-items:center;gap:6px;">${icon('sparkles')} Organic Roadmaps & Distinction</a><a href="#formulas" class="button outline" style="font-size:0.8rem;padding:0.4rem 0.85rem;min-height:38px;display:inline-flex;align-items:center;gap:6px;">${icon('copy')} Formulas</a>`;
  } else if (selectedSubject.id === 'math') {
    studioShortcuts = `<a href="#derivations" class="button outline" style="font-size:0.8rem;padding:0.4rem 0.85rem;min-height:38px;display:inline-flex;align-items:center;gap:6px;">${icon('book-open')} Math Proofs</a><a href="#formulas" class="button outline" style="font-size:0.8rem;padding:0.4rem 0.85rem;min-height:38px;display:inline-flex;align-items:center;gap:6px;">${icon('copy')} Formulas</a>`;
  } else if (selectedSubject.id === 'english') {
    studioShortcuts = `<a href="#english-studio" class="button outline" style="font-size:0.8rem;padding:0.4rem 0.85rem;min-height:38px;display:inline-flex;align-items:center;gap:6px;">${icon('pencil')} Literature & Writing Studio</a>`;
  } else if (selectedSubject.id === 'pe') {
    studioShortcuts = `<a href="#pe-studio" class="button outline" style="font-size:0.8rem;padding:0.4rem 0.85rem;min-height:38px;display:inline-flex;align-items:center;gap:6px;">${icon('trophy')} Fixtures & Biomechanics</a>`;
  }

  // Quick Mastery & Difficulty Control Bar
  const masteryControlBar = `
    <div class="chapter-mastery-banner">
      <div class="mastery-banner-top">
        <div class="mastery-badge-group">
          <span class="weightage-badge">⚡ ${weightMarks} Marks in CBSE Board</span>
          <span class="status-badge" style="background:${currentStyle.bg};color:${currentStyle.color};">${currentStyle.label}</span>
          ${currentChapterRating ? `<span class="clarity-badge rating-${currentChapterRating.toLowerCase()}">★ ${currentChapterRating}</span>` : '<span class="clarity-badge unrated">☆ Clarity: Not rated</span>'}
        </div>
        <div class="mastery-studio-shortcuts">
          ${studioShortcuts}
        </div>
      </div>
      <div class="mastery-trackers-grid">
        <div class="tracker-column">
          <label class="tracker-title">One-Click Chapter Mastery Tracker:</label>
          <div class="tracker-btn-row">
            <button type="button" class="button ${currentChapterStatus==='Exam Ready'?'primary':'outline'}" data-action="quick-chapter-status" data-chapter="${selected.id}" data-status="Exam Ready">🌟 Exam Ready</button>
            <button type="button" class="button ${currentChapterStatus==='Practising'?'primary':'outline'}" data-action="quick-chapter-status" data-chapter="${selected.id}" data-status="Practising">🔄 Practising</button>
            <button type="button" class="button ${currentChapterStatus==='Needs revision'?'primary':'outline'}" data-action="quick-chapter-status" data-chapter="${selected.id}" data-status="Needs revision">⚠️ Needs Revision</button>
            <button type="button" class="button quiet reset-btn" data-action="quick-chapter-status" data-chapter="${selected.id}" data-status="Pending">Reset</button>
          </div>
        </div>
        <div class="tracker-column">
          <label class="tracker-title">One-Click Chapter Difficulty / Clarity:</label>
          <div class="tracker-btn-row">
            <button type="button" class="diff-chip diff-easy ${currentChapterRating==='Easy'?'active':''}" data-action="quick-chapter-rating" data-chapter="${selected.id}" data-rating="Easy">🟢 Easy</button>
            <button type="button" class="diff-chip diff-okay ${currentChapterRating==='Okay'?'active':''}" data-action="quick-chapter-rating" data-chapter="${selected.id}" data-rating="Okay">🟡 Okay</button>
            <button type="button" class="diff-chip diff-difficult ${currentChapterRating==='Difficult'?'active':''}" data-action="quick-chapter-rating" data-chapter="${selected.id}" data-rating="Difficult">🔴 Difficult</button>
            ${currentChapterRating?`<button type="button" class="button quiet reset-btn" data-action="quick-chapter-rating" data-chapter="${selected.id}" data-rating="">Reset</button>`:''}
          </div>
        </div>
      </div>
    </div>
  `;

  const right=fullyTranscribed?`<section class="academic-hierarchy">
    ${masteryControlBar}
    <div class="section-head"><div><p class="eyebrow">VERIFIED TOPIC LEARNING</p><h2>${esc(selected.title)}</h2><p class="muted">${marked} of ${assigned} topic statuses recorded · ${esc(currentUnit)}</p></div><span class="verification-badge">CBSE 2026–27 verified</span></div>
    <p class="academic-note">Topic titles and scope below come from the official CBSE syllabus. Unmarked topics remain unknown until recorded.</p>
    <div class="topic-list">${nodes.map(node=>topicCard(node,state)).join('')}</div>
  </section>`:`<section class="academic-hierarchy">
    ${masteryControlBar}
    <div class="section-head"><div><p class="eyebrow">CHAPTER OUTLINE</p><h2>${esc(selected.title)}</h2><p class="muted">${esc(currentUnit)}</p></div><span class="verification-badge">${chapterSource?.status==='verified'?'Chapter listed':'Chapter detail needs verification'}</span></div>
    <p class="academic-note">Full CBSE syllabus scope for this chapter. Mark your preparation level above to update your Board Readiness Score.</p>
    ${chapterSource?sourceBlock(chapterSource.title+' · '+chapterSource.section,chapterSource.url,chapterSource.pdfPage):''}
  </section>`;

  return `<div class="page academics-page">${subhead('CBSE CLASS XII · 2026–27','Your academic world','Track your progress and access high-yield exam resources.') }<div class="subject-tabs" aria-label="Subjects">${subjects.map(item=>`<button class="button outline" data-action="subject" data-value="${item.id}" aria-pressed="${selectedSubject.id===item.id}">${esc(item.title)}</button>`).join('')}</div><div class="academic-two-column">${left}<div class="academic-chapter-content">${right}</div></div></div>`;
}

function checklist(activity:ActivityDefinition,record:LearnerActivityRecord|undefined){
  return activity.steps.map(step=>`<label class="activity-step"><input type="checkbox" name="steps" value="${esc(step.id)}"${record?.completedSteps.includes(step.id)?' checked':''}><span><small>STEP ${activity.steps.indexOf(step)+1}</small>${esc(step.instruction)}</span></label>`).join('');
}

export function renderAcademicWorkspace(activityId:string,state:State):string{
  const activity=activityById(activityId);if(!activity)return `<div class="page"><h1>Activity unavailable</h1><p>This activity is not part of the verified local curriculum bundle. Return to Academics to choose another path.</p><button type="button" class="button outline" data-action="syllabus">Back to Academics</button></div>`;
  const node=academicNodes.find(item=>item.id===activity.nodeId),chapter=chapters.find(item=>item.id===node?.chapterId),record=state.academic.activities[activity.id];if(!node||!chapter)return `<div class="page"><h1>Activity unavailable</h1><p>The curriculum link could not be resolved.</p></div>`;
  const kindLabel=activity.kind.replaceAll('-',' '),practice=activity.kind==='practice'||activity.kind==='assessment';
  return `<div class="page activity-workspace">
    <div class="activity-nav"><button type="button" class="button quiet" data-action="back-academic">${icon('arrow-left')} Back to ${esc(chapter.title)}</button><div class="activity-nav-links"><a class="button outline" href="#focus" data-nav="focus">Open focus timer ${icon('timer')}</a>${sourceBlock(activity.sourceRefs[0].title,activity.sourceRefs[0].url,activity.sourceRefs[0].pdfPage)}</div></div>
    ${subhead(esc(subjectById(node.subjectId)?.title??'ACADEMICS'),activity.title,chapter.title+' · '+node.title+' · '+kindLabel)}
    <div class="activity-reason"><strong>Your learning objective</strong><p>${esc(activity.objective)}</p><p class="muted">${esc(state.tasks.find(task=>task.activityId===activity.id)?.reason??'This activity follows the topic status you recorded.')}</p></div>
    <form id="academic-activity-form" data-activity-id="${esc(activity.id)}">
      <section class="activity-steps"><div class="section-head"><div><p class="eyebrow">WORK THROUGH THE STEPS</p><h2>What to do</h2></div><small>${activity.estimatedMinutes} min estimate · actual time is recorded only by the focus timer</small></div>${checklist(activity,record)}</section>
      <section class="activity-evidence"><div class="section-head"><div><p class="eyebrow">YOUR WORK</p><h2>Practice and notes</h2></div></div>${practice?`<div class="form-pair"><label>Questions attempted<input name="questionsAttempted" type="number" min="0" max="100000" value="${record?.questionsAttempted??''}"></label><label>Questions checked correct<input name="questionsCorrect" type="number" min="0" max="100000" value="${record?.questionsCorrect??''}"></label></div><label>Questions checked incorrect<input name="questionsIncorrect" type="number" min="0" max="100000" value="${record?.questionsIncorrect??''}"></label>`:''}<label>Your explanation or notes<textarea name="notes" rows="4" maxlength="4000" placeholder="Write what you understood, a doubt, or where you want to resume.">${esc(record?.notes??'')}</textarea></label><label>Doubt to revisit <span class="muted">(optional)</span><textarea name="doubt" rows="2" maxlength="4000">${esc(record?.doubt??'')}</textarea></label></section>
      <fieldset class="activity-reflection"><legend>${esc(activity.reflectionPrompt)}</legend>${ratings.map(rating=>`<label><input type="radio" name="understanding" value="${rating}"${record?.understanding===rating?' checked':''}><span>${rating}</span></label>`).join('')}</fieldset>
      <div class="activity-evidence-check"><strong>Completion evidence</strong>${activity.completionEvidence.map(item=>`<p>${icon('check')} ${esc(item)}</p>`).join('')}</div>
      <div class="dialog-actions">${button('save-activity','Save and continue later','outline',activity.id)}<button type="button" class="button primary" data-action="complete-activity" data-value="${esc(activity.id)}">Complete this activity ${icon('arrow-right')}</button></div>
      <p class="study-footnote">Completing this activity records this work only. It does not mark the topic or chapter learned; update topic status separately when you choose.</p>
    </form></div>`;
}
