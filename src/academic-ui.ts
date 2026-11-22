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
  return `<article class="topic-card" data-topic-card="${esc(node.id)}"><div class="topic-card-head"><div><p class="eyebrow">VERIFIED TOPIC</p><h3>${esc(node.title)}</h3></div><span class="status ${progress?'marked':''}">${esc(label)}</span></div><p class="topic-scope">${esc(node.officialScope)}</p>${sourceBlock(node.source.title,node.source.url,node.source.pdfPage)}${hasLegacyStudyRecord&&!progress?`<p class="academic-note">Your existing chapter record or task was preserved. Link it to this topic only if you choose; it does not auto-fill this topic status.</p>`:''}<div class="topic-state-edit"><label>How would you describe your preparation?<select data-topic-status="${esc(node.id)}">${option('',progress?'Keep current status':'Choose a status',progress?'__keep':'')}${topicStatus.map(([value,name])=>option(value,name,progress?.status)).join('')}</select></label>${button('save-topic-status','Save status','outline',node.id)}</div>${activity?`<div class="next-activity-card"><div><p class="eyebrow">NEXT ACTIVITY · ${esc(activity.kind.replaceAll('-',' '))}</p><h4>${esc(activity.title)}</h4><p>${esc(activity.objective)}</p><small>${activity.estimatedMinutes} min · ${progress?.rating?'Last rating: '+progress.rating:'No understanding rating yet'}</small></div>${button('launch-activity','Open workspace','primary',activity.id)}</div>`:`<p class="academic-note">${progress?'No further activity is queued from this status and recorded activity. You can update the status or revisit later.':'Record a topic status before BLOOM recommends an activity. Unmarked does not mean unlearned.'}</p>`}</article>`;
}

export function renderAcademicHub(subjectId:string,selectedChapterId:string,state:State):string{
  const selectedSubject=subjectById(subjectId)??subjects[0],list=chapters.filter(chapter=>chapter.subject===selectedSubject.id),selected=list.find(chapter=>chapter.id===selectedChapterId)??list[0];
  const nodes=academicNodes.filter(node=>node.chapterId===selected.id&&(node.kind==='topic'||node.kind==='concept')),fullyTranscribed=nodes.length>0;
  const assigned=nodes.length,marked=nodes.filter(node=>state.academic.topicProgress[node.id]).length;
  const currentUnit=selected.allocation;
  const currentChapterStatus=state.progress[selected.id]?.status??'Unmarked';
  const weightMarks=cbseChapterWeightageMap[selected.id]??5;

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

  const left=`<aside class="academic-chapters"><div class="section-head"><div><h2>${esc(selectedSubject.title)}</h2><p class="muted">${list.length} syllabus chapters</p></div></div>${list.map(chapter=>{
    const st=state.progress[chapter.id]?.status??'Unmarked';
    const sc=statusColors[st]??statusColors['Unmarked'];
    const wm=cbseChapterWeightageMap[chapter.id]??5;
    return `<button type="button" class="academic-chapter ${chapter.id===selected.id?'selected':''}" data-action="academic-chapter" data-value="${esc(chapter.id)}" style="display:flex;flex-direction:column;gap:0.25rem;">
      <div style="display:flex;justify-content:space-between;align-items:center;width:100%;">
        <strong style="font-size:0.88rem;">${esc(chapter.title)}</strong>
        <span style="font-size:0.7rem;font-weight:700;background:rgba(2,132,199,0.1);color:#0284c7;padding:0.15rem 0.4rem;border-radius:4px;flex-shrink:0;">${wm}M</span>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;width:100%;">
        <small style="font-size:0.75rem;color:var(--muted,#64748b);">${esc(chapter.allocation)}</small>
        <span style="font-size:0.68rem;font-weight:700;background:${sc.bg};color:${sc.color};padding:0.1rem 0.35rem;border-radius:3px;">${sc.label}</span>
      </div>
    </button>`;
  }).join('')}</aside>`;

  const chapterSource=academicNodes.find(node=>node.id===selected.id&&node.kind==='chapter')?.source;

  // Studio Quick-Jump helper based on subject
  let studioShortcuts = '';
  if (selectedSubject.id === 'physics') {
    studioShortcuts = `<a href="#derivations" class="button outline" style="font-size:0.8rem;padding:0.35rem 0.75rem;min-height:32px;">${icon('book-open')} Derivations Lab</a><a href="#formulas" class="button outline" style="font-size:0.8rem;padding:0.35rem 0.75rem;min-height:32px;">${icon('copy')} Formulas</a>`;
  } else if (selectedSubject.id === 'chemistry') {
    studioShortcuts = `<a href="#roadmaps" class="button outline" style="font-size:0.8rem;padding:0.35rem 0.75rem;min-height:32px;">${icon('sparkles')} Organic Roadmaps & Distinction</a><a href="#formulas" class="button outline" style="font-size:0.8rem;padding:0.35rem 0.75rem;min-height:32px;">${icon('copy')} Formulas</a>`;
  } else if (selectedSubject.id === 'math') {
    studioShortcuts = `<a href="#derivations" class="button outline" style="font-size:0.8rem;padding:0.35rem 0.75rem;min-height:32px;">${icon('book-open')} Math Proofs</a><a href="#formulas" class="button outline" style="font-size:0.8rem;padding:0.35rem 0.75rem;min-height:32px;">${icon('copy')} Formulas</a>`;
  } else if (selectedSubject.id === 'english') {
    studioShortcuts = `<a href="#english-studio" class="button outline" style="font-size:0.8rem;padding:0.35rem 0.75rem;min-height:32px;">${icon('pencil')} Literature & Writing Studio</a>`;
  } else if (selectedSubject.id === 'pe') {
    studioShortcuts = `<a href="#pe-studio" class="button outline" style="font-size:0.8rem;padding:0.35rem 0.75rem;min-height:32px;">${icon('trophy')} Fixtures & Biomechanics</a>`;
  }

  // Quick Mastery Control Bar
  const masteryControlBar = `
    <div style="background:var(--surface,#ffffff);border:1px solid var(--border,#e2e8f0);border-radius:12px;padding:1.25rem;margin-bottom:1.5rem;box-shadow:0 4px 12px rgba(0,0,0,0.03);">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.75rem;margin-bottom:1rem;border-bottom:1px solid var(--border,#e2e8f0);padding-bottom:0.75rem;">
        <div>
          <span style="font-size:0.75rem;font-weight:700;background:#e0f2fe;color:#0369a1;padding:0.2rem 0.5rem;border-radius:4px;text-transform:uppercase;">⚡ ${weightMarks} Marks in CBSE Board</span>
          <span style="font-size:0.75rem;font-weight:700;background:${currentStyle.bg};color:${currentStyle.color};padding:0.2rem 0.5rem;border-radius:4px;margin-left:0.4rem;">${currentStyle.label}</span>
        </div>
        <div style="display:flex;gap:0.4rem;align-items:center;">
          ${studioShortcuts}
        </div>
      </div>
      <div>
        <label style="display:block;font-size:0.8rem;font-weight:700;color:var(--muted,#64748b);text-transform:uppercase;margin-bottom:0.5rem;">One-Click Chapter Mastery Tracker:</label>
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
          <button type="button" class="button ${currentChapterStatus==='Exam Ready'?'primary':'outline'}" data-action="quick-chapter-status" data-chapter="${selected.id}" data-status="Exam Ready" style="font-size:0.85rem;min-height:36px;padding:0.4rem 0.85rem;">🌟 Exam Ready</button>
          <button type="button" class="button ${currentChapterStatus==='Practising'?'primary':'outline'}" data-action="quick-chapter-status" data-chapter="${selected.id}" data-status="Practising" style="font-size:0.85rem;min-height:36px;padding:0.4rem 0.85rem;">🔄 Practising</button>
          <button type="button" class="button ${currentChapterStatus==='Needs revision'?'primary':'outline'}" data-action="quick-chapter-status" data-chapter="${selected.id}" data-status="Needs revision" style="font-size:0.85rem;min-height:36px;padding:0.4rem 0.85rem;">⚠️ Needs Revision</button>
          <button type="button" class="button quiet" data-action="quick-chapter-status" data-chapter="${selected.id}" data-status="Pending" style="font-size:0.82rem;min-height:36px;padding:0.4rem 0.65rem;">Reset</button>
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
