import { ResumeData } from '@/lib/resume/types'
import { TemplateId } from '@/lib/resume/templates'

interface ResumePreviewProps {
  data: ResumeData
  template: TemplateId
}

export default function ResumePreview({ data, template }: ResumePreviewProps) {
  const { personalInfo: p, summary, workExperience, caQualification, education, certifications, technicalSkills, caSpecialisations, softSkills } = data

  if (template === 'modern') return <ModernTemplate data={data} />
  if (template === 'minimal') return <MinimalTemplate data={data} />
  return <ClassicTemplate data={data} />
}

/* ── Classic Template ─────────────────────────────────────────────── */
function ClassicTemplate({ data }: { data: ResumeData }) {
  const { personalInfo: p, summary, workExperience, caQualification, education, certifications, technicalSkills, caSpecialisations } = data

  const s: Record<string, React.CSSProperties> = {
    page: { fontFamily: "'Times New Roman', Times, serif", fontSize: '11px', color: '#111', padding: '20mm 18mm', lineHeight: 1.45, minHeight: '297mm', background: '#fff' },
    name: { fontSize: '22px', fontWeight: 'bold', color: '#0A1628', marginBottom: '4px' },
    contactLine: { fontSize: '10px', color: '#555', marginBottom: '12px' },
    sectionHead: { fontSize: '11px', fontWeight: 'bold', color: '#0A1628', textTransform: 'uppercase' as const, letterSpacing: '1px', borderBottom: '1.5px solid #0A1628', paddingBottom: '3px', marginBottom: '8px', marginTop: '14px' },
    jobTitle: { fontWeight: 'bold', fontSize: '11px' },
    jobMeta: { fontSize: '10px', color: '#555', marginBottom: '4px' },
    bullet: { paddingLeft: '14px', fontSize: '10.5px', marginBottom: '3px', position: 'relative' as const },
    tag: { display: 'inline-block', background: '#f0f0f0', borderRadius: '3px', padding: '1px 6px', fontSize: '10px', marginRight: '4px', marginBottom: '3px' },
  }

  return (
    <div style={s.page} id="resume-preview">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <div style={s.name}>{p.name || 'Your Name'}{caQualification.level === 'Final' && caQualification.membershipNumber ? ', CA' : ''}</div>
        <div style={s.contactLine}>
          {[p.email, p.phone, `${p.city}${p.state ? ', ' + p.state : ''}`, p.linkedIn].filter(Boolean).join('  ·  ')}
        </div>
        {p.headline && <div style={{ fontSize: '10.5px', color: '#444', fontStyle: 'italic' }}>{p.headline}</div>}
      </div>

      {summary && (
        <>
          <div style={s.sectionHead}>Professional Summary</div>
          <p style={{ fontSize: '10.5px', marginBottom: '0' }}>{summary}</p>
        </>
      )}

      {workExperience.length > 0 && (
        <>
          <div style={s.sectionHead}>Professional Experience</div>
          {workExperience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={s.jobTitle}>{exp.company}</span>
                <span style={{ fontSize: '10px', color: '#555' }}>
                  {exp.startMonth} {exp.startYear} – {exp.isPresent ? 'Present' : `${exp.endMonth} ${exp.endYear}`}
                </span>
              </div>
              <div style={s.jobMeta}>{exp.title} · {exp.employmentType}</div>
              {exp.responsibilities && exp.responsibilities.split('\n').filter(Boolean).map((line, i) => (
                <div key={i} style={s.bullet}>• {line.replace(/^[•\-]\s*/, '')}</div>
              ))}
            </div>
          ))}
        </>
      )}

      <div style={s.sectionHead}>Qualifications</div>
      <div style={{ marginBottom: '8px' }}>
        <div style={s.jobTitle}>CA (ICAI) — {caQualification.level}</div>
        <div style={{ fontSize: '10px', color: '#555' }}>
          {caQualification.passingMonth && caQualification.passingYear && `${caQualification.passingMonth} ${caQualification.passingYear}`}
          {caQualification.airRank && ` | AIR ${caQualification.airRank}`}
          {caQualification.membershipNumber && ` | M.No. ${caQualification.membershipNumber}`}
        </div>
      </div>
      {education.map((edu) => (
        <div key={edu.id} style={{ marginBottom: '6px' }}>
          <div style={s.jobTitle}>{edu.degree}</div>
          <div style={{ fontSize: '10px', color: '#555' }}>{edu.institution}{edu.year && ` | ${edu.year}`}{edu.score && ` | ${edu.score}`}</div>
        </div>
      ))}

      {(technicalSkills.length > 0 || caSpecialisations.length > 0) && (
        <>
          <div style={s.sectionHead}>Skills & Expertise</div>
          {caSpecialisations.length > 0 && (
            <div style={{ marginBottom: '5px' }}>
              <span style={{ fontWeight: 'bold', fontSize: '10px' }}>Specialisations: </span>
              <span style={{ fontSize: '10px' }}>{caSpecialisations.join(' · ')}</span>
            </div>
          )}
          {technicalSkills.length > 0 && (
            <div>
              {technicalSkills.map((skill) => (
                <span key={skill} style={s.tag}>{skill}</span>
              ))}
            </div>
          )}
        </>
      )}

      {certifications.length > 0 && (
        <>
          <div style={s.sectionHead}>Certifications</div>
          <div style={{ fontSize: '10.5px' }}>
            {certifications.map((c, i) => (
              <span key={c.id}>{c.name}{c.issuingBody && ` (${c.issuingBody})`}{c.year && `, ${c.year}`}{i < certifications.length - 1 ? '  ·  ' : ''}</span>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/* ── Modern Template ──────────────────────────────────────────────── */
function ModernTemplate({ data }: { data: ResumeData }) {
  const { personalInfo: p, summary, workExperience, caQualification, education, certifications, technicalSkills, caSpecialisations, languages } = data

  return (
    <div id="resume-preview" style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', display: 'flex', minHeight: '297mm', background: '#fff' }}>
      {/* Sidebar */}
      <div style={{ width: '32%', background: '#0A1628', color: '#fff', padding: '20px 14px', flexShrink: 0 }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#F5A623', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 'bold', color: '#0A1628', marginBottom: '12px' }}>
          {p.name ? p.name[0].toUpperCase() : '?'}
        </div>
        <div style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '3px' }}>{p.name || 'Your Name'}</div>
        {caQualification.level === 'Final' && <div style={{ fontSize: '10px', color: '#F5A623', marginBottom: '12px' }}>Chartered Accountant</div>}
        {p.headline && <div style={{ fontSize: '9.5px', color: '#ccc', marginBottom: '12px', lineHeight: 1.4 }}>{p.headline}</div>}

        <div style={{ fontSize: '10px', marginBottom: '12px' }}>
          {p.email && <div style={{ marginBottom: '3px', wordBreak: 'break-all' }}>✉ {p.email}</div>}
          {p.phone && <div style={{ marginBottom: '3px' }}>📱 {p.phone}</div>}
          {(p.city || p.state) && <div style={{ marginBottom: '3px' }}>📍 {p.city}{p.state ? ', ' + p.state : ''}</div>}
          {p.linkedIn && <div style={{ wordBreak: 'break-all' }}>🔗 {p.linkedIn}</div>}
        </div>

        {technicalSkills.length > 0 && (
          <>
            <div style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '4px', marginBottom: '8px', color: '#F5A623' }}>Skills</div>
            {technicalSkills.map((skill) => (
              <div key={skill} style={{ fontSize: '9.5px', color: '#ddd', marginBottom: '3px' }}>• {skill}</div>
            ))}
          </>
        )}

        {languages.length > 0 && (
          <>
            <div style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '4px', marginBottom: '8px', marginTop: '12px', color: '#F5A623' }}>Languages</div>
            {languages.map((lang) => (
              <div key={lang.id} style={{ fontSize: '9.5px', color: '#ddd', marginBottom: '3px' }}>{lang.name}</div>
            ))}
          </>
        )}
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: '20px 16px', color: '#111' }}>
        {summary && (
          <>
            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#0A1628', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '2px solid #0A1628', paddingBottom: '3px', marginBottom: '8px' }}>Professional Summary</div>
            <p style={{ fontSize: '10.5px', marginBottom: '14px' }}>{summary}</p>
          </>
        )}

        {workExperience.length > 0 && (
          <>
            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#0A1628', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '2px solid #0A1628', paddingBottom: '3px', marginBottom: '8px' }}>Experience</div>
            {workExperience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '11px' }}>{exp.title}</span>
                  <span style={{ fontSize: '10px', color: '#555' }}>{exp.startYear} – {exp.isPresent ? 'Present' : exp.endYear}</span>
                </div>
                <div style={{ fontSize: '10px', color: '#7C3AED', marginBottom: '4px' }}>{exp.company}</div>
                {exp.responsibilities && exp.responsibilities.split('\n').filter(Boolean).map((line, i) => (
                  <div key={i} style={{ fontSize: '10.5px', paddingLeft: '12px', marginBottom: '2px' }}>• {line.replace(/^[•\-]\s*/, '')}</div>
                ))}
              </div>
            ))}
          </>
        )}

        <>
          <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#0A1628', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '2px solid #0A1628', paddingBottom: '3px', marginBottom: '8px', marginTop: '14px' }}>Qualifications</div>
          <div style={{ fontWeight: 'bold', fontSize: '11px' }}>CA (ICAI) — {caQualification.level}</div>
          <div style={{ fontSize: '10px', color: '#555', marginBottom: '6px' }}>
            {[caQualification.passingMonth && caQualification.passingYear && `${caQualification.passingMonth} ${caQualification.passingYear}`, caQualification.airRank && `AIR ${caQualification.airRank}`].filter(Boolean).join(' | ')}
          </div>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '6px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '10.5px' }}>{edu.degree}</div>
              <div style={{ fontSize: '10px', color: '#555' }}>{edu.institution}{edu.year && ` · ${edu.year}`}</div>
            </div>
          ))}
        </>

        {caSpecialisations.length > 0 && (
          <>
            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#0A1628', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '2px solid #0A1628', paddingBottom: '3px', marginBottom: '8px', marginTop: '14px' }}>Specialisations</div>
            <div>{caSpecialisations.map((s) => (
              <span key={s} style={{ display: 'inline-block', background: '#EDE9FE', color: '#7C3AED', borderRadius: '4px', padding: '2px 7px', fontSize: '9.5px', marginRight: '4px', marginBottom: '4px' }}>{s}</span>
            ))}</div>
          </>
        )}

        {certifications.length > 0 && (
          <>
            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#0A1628', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '2px solid #0A1628', paddingBottom: '3px', marginBottom: '8px', marginTop: '14px' }}>Certifications</div>
            {certifications.map((c) => (
              <div key={c.id} style={{ fontSize: '10.5px', marginBottom: '3px' }}>• {c.name}{c.issuingBody && ` — ${c.issuingBody}`}{c.year && ` (${c.year})`}</div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

/* ── Minimal Template ─────────────────────────────────────────────── */
function MinimalTemplate({ data }: { data: ResumeData }) {
  const { personalInfo: p, summary, workExperience, caQualification, education, certifications, technicalSkills, caSpecialisations } = data

  return (
    <div id="resume-preview" style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '11px', color: '#222', padding: '22mm 20mm', minHeight: '297mm', background: '#fff', lineHeight: 1.5 }}>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '24px', fontWeight: '700', color: '#111', marginBottom: '4px' }}>{p.name || 'Your Name'}</div>
        {p.headline && <div style={{ fontSize: '11px', color: '#555', marginBottom: '5px' }}>{p.headline}</div>}
        <div style={{ fontSize: '10px', color: '#777' }}>
          {[p.email, p.phone, `${p.city}${p.state ? ', ' + p.state : ''}`].filter(Boolean).join('  |  ')}
        </div>
      </div>

      {summary && (
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '11.5px', fontWeight: '700', color: '#444', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '5px' }}>Summary</div>
          <p style={{ fontSize: '10.5px', color: '#333' }}>{summary}</p>
        </div>
      )}

      {workExperience.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '11.5px', fontWeight: '700', color: '#444', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>Experience</div>
          {workExperience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600', fontSize: '11px' }}>{exp.title}, {exp.company}</span>
                <span style={{ fontSize: '10px', color: '#777' }}>{exp.startYear}–{exp.isPresent ? 'Present' : exp.endYear}</span>
              </div>
              {exp.responsibilities && exp.responsibilities.split('\n').filter(Boolean).map((line, i) => (
                <div key={i} style={{ fontSize: '10.5px', paddingLeft: '12px', color: '#333', marginTop: '2px' }}>• {line.replace(/^[•\-]\s*/, '')}</div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '11.5px', fontWeight: '700', color: '#444', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>Education & Qualifications</div>
        <div style={{ marginBottom: '6px' }}>
          <span style={{ fontWeight: '600' }}>CA (ICAI)</span>
          {caQualification.passingYear && <span style={{ color: '#777', fontSize: '10px' }}> · {caQualification.passingYear}{caQualification.airRank && ` · AIR ${caQualification.airRank}`}</span>}
        </div>
        {education.map((edu) => (
          <div key={edu.id} style={{ marginBottom: '5px' }}>
            <span style={{ fontWeight: '600' }}>{edu.degree}</span>
            <span style={{ color: '#777', fontSize: '10px' }}>{edu.institution && ` · ${edu.institution}`}{edu.year && ` · ${edu.year}`}</span>
          </div>
        ))}
      </div>

      {(technicalSkills.length > 0 || caSpecialisations.length > 0) && (
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '11.5px', fontWeight: '700', color: '#444', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>Skills</div>
          <div style={{ fontSize: '10.5px', color: '#333' }}>
            {[...caSpecialisations, ...technicalSkills].join('  ·  ')}
          </div>
        </div>
      )}

      {certifications.length > 0 && (
        <div>
          <div style={{ fontSize: '11.5px', fontWeight: '700', color: '#444', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '6px' }}>Certifications</div>
          <div style={{ fontSize: '10.5px', color: '#333' }}>
            {certifications.map((c, i) => <span key={c.id}>{c.name}{i < certifications.length - 1 ? '  ·  ' : ''}</span>)}
          </div>
        </div>
      )}
    </div>
  )
}
