'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SiteContent } from '@/lib/content';

const FIELDS: { section: string; fields: { key: keyof SiteContent; label: string; multiline?: boolean }[] }[] = [
  {
    section: 'Hero',
    fields: [
      { key: 'hero_label',    label: 'Top label' },
      { key: 'hero_headline', label: 'Headline' },
      { key: 'hero_subtitle', label: 'Subtitle', multiline: true },
      { key: 'hero_stat1_value', label: 'Stat 1 value' },
      { key: 'hero_stat1_label', label: 'Stat 1 label' },
      { key: 'hero_stat2_value', label: 'Stat 2 value' },
      { key: 'hero_stat2_label', label: 'Stat 2 label' },
      { key: 'hero_stat3_value', label: 'Stat 3 value' },
      { key: 'hero_stat3_label', label: 'Stat 3 label' },
      { key: 'hero_stat4_value', label: 'Stat 4 value' },
      { key: 'hero_stat4_label', label: 'Stat 4 label' },
    ],
  },
  {
    section: 'Contact',
    fields: [
      { key: 'contact_georgie', label: "Georgie's phone" },
      { key: 'contact_louise',  label: "Louise's phone" },
      { key: 'contact_email',   label: 'Email' },
      { key: 'contact_address', label: 'Street address' },
      { key: 'contact_suburb',  label: 'Suburb / state / postcode' },
    ],
  },
  {
    section: 'Pricing',
    fields: [
      { key: 'pricing_rate',    label: 'Hourly rate' },
      { key: 'pricing_minimum', label: 'Minimum booking' },
      { key: 'pricing_note',    label: 'Pricing note', multiline: true },
    ],
  },
  {
    section: 'About',
    fields: [
      { key: 'about_tagline', label: 'Tagline' },
      { key: 'about_body',    label: 'Body text', multiline: true },
    ],
  },
  {
    section: 'FAQ',
    fields: [
      { key: 'faq_1_q', label: 'Question 1' }, { key: 'faq_1_a', label: 'Answer 1', multiline: true },
      { key: 'faq_2_q', label: 'Question 2' }, { key: 'faq_2_a', label: 'Answer 2', multiline: true },
      { key: 'faq_3_q', label: 'Question 3' }, { key: 'faq_3_a', label: 'Answer 3', multiline: true },
      { key: 'faq_4_q', label: 'Question 4' }, { key: 'faq_4_a', label: 'Answer 4', multiline: true },
      { key: 'faq_5_q', label: 'Question 5' }, { key: 'faq_5_a', label: 'Answer 5', multiline: true },
      { key: 'faq_6_q', label: 'Question 6' }, { key: 'faq_6_a', label: 'Answer 6', multiline: true },
      { key: 'faq_7_q', label: 'Question 7' }, { key: 'faq_7_a', label: 'Answer 7', multiline: true },
      { key: 'faq_8_q', label: 'Question 8' }, { key: 'faq_8_a', label: 'Answer 8', multiline: true },
      { key: 'faq_9_q', label: 'Question 9' }, { key: 'faq_9_a', label: 'Answer 9', multiline: true },
    ],
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('Hero');

  useEffect(() => {
    fetch('/api/admin/content')
      .then(r => {
        if (r.status === 401) { router.push('/admin'); return null; }
        return r.json();
      })
      .then(data => { if (data) setContent(data); });
  }, [router]);

  const saveField = async (key: keyof SiteContent, value: string) => {
    setSaving(key);
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [key]: value }),
    });
    setSaving(null);
    setSaved(key);
    setTimeout(() => setSaved(null), 2000);
  };

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  };

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center font-mono">
        <p className="text-green-400 text-sm animate-pulse">loading content...</p>
      </div>
    );
  }

  const currentSection = FIELDS.find(s => s.section === activeSection)!;

  return (
    <div className="min-h-screen bg-gray-950 font-mono text-sm flex flex-col">
      {/* Top bar */}
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 font-bold">nck-admin</span>
          <span className="text-gray-600">~/content</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" target="_blank" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
            ↗ view site
          </a>
          <button onClick={logout} className="text-red-400 hover:text-red-300 text-xs transition-colors">
            logout
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-44 bg-gray-900 border-r border-gray-800 flex-shrink-0 py-4">
          <p className="text-gray-600 text-xs px-4 mb-3">SECTIONS</p>
          {FIELDS.map(s => (
            <button
              key={s.section}
              onClick={() => setActiveSection(s.section)}
              className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                activeSection === s.section
                  ? 'text-green-400 bg-gray-800 border-l-2 border-green-400'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {s.section.toLowerCase()}
            </button>
          ))}
        </div>

        {/* Editor */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <p className="text-gray-600 text-xs mb-6">
            $ edit <span className="text-green-400">{activeSection.toLowerCase()}</span> — changes save on blur
          </p>

          <div className="space-y-5 max-w-2xl">
            {currentSection.fields.map(({ key, label, multiline }) => (
              <div key={key}>
                <label className="text-gray-500 text-xs block mb-1">
                  {label}
                  <span className="text-gray-700 ml-2">[{key}]</span>
                </label>
                {multiline ? (
                  <textarea
                    defaultValue={content[key] as string}
                    rows={3}
                    onBlur={e => saveField(key, e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 text-green-300 text-sm px-3 py-2 rounded focus:outline-none focus:border-green-500 resize-y placeholder-gray-600"
                  />
                ) : (
                  <input
                    type="text"
                    defaultValue={content[key] as string}
                    onBlur={e => saveField(key, e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 text-green-300 text-sm px-3 py-2 rounded focus:outline-none focus:border-green-500 placeholder-gray-600"
                  />
                )}
                {saving === key && <p className="text-yellow-400 text-xs mt-1">saving...</p>}
                {saved === key && <p className="text-green-400 text-xs mt-1">✓ saved</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
