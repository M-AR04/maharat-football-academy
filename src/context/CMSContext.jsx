import React, { createContext, useState, useContext } from 'react';
import { useLanguage } from './LanguageContext';

const CMSContext = createContext();

export const CMSProvider = ({ children }) => {
  const { language } = useLanguage();

  // Load from local storage or fallback to dynamic defaults
  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem('maharat_cms_content');
    if (saved) return JSON.parse(saved);

    return {
      en: {
        hero: {
          badge: "Riyadh's Premier Youth Academy",
          title: "Nurturing the Future Legends of Saudi Football",
          subtitle: "Professional football coaching for children and youth (ages 4-18) at Al-Joker Fields, Riyadh.",
          cta: "Register Now",
          learnMore: "Explore Programs"
        },
        about: {
          title: "Empowering Riyadh's Youth Through Sports",
          desc1: "Maharat Football Academy is Ash Shafa's premium youth athletic center. Directed by Coach Abu Rayan, a pioneer in local youth development, we provide top-tier coaching that builds technical skills and nurtures disciplined, strong athletic characters.",
          desc2: "We believe football is more than a game—it is a school for life. Our training sessions foster teamwork, leadership, healthy habits, and resilience, ensuring that every kid grows on and off the green field."
        },
        contact: {
          phone: "+966 50 739 8888",
          address: "Arafat Rd, Ash Shafa, Riyadh 14713, Saudi Arabia"
        }
      },
      ar: {
        hero: {
          badge: "الأكاديمية الرياضية الرائدة في الرياض",
          title: "صناعة أساطير الغد للكرة السعودية",
          subtitle: "تدريب احترافي وتطوير مهارات كرة القدم للأطفال والشباب (سن 4-18) في ملاعب الجوكر، الرياض.",
          cta: "سجل طفلك الآن",
          learnMore: "اكتشف البرامج"
        },
        about: {
          title: "تمكين مواهب الرياض الرياضية عبر كرة القدم",
          desc1: "تعتبر أكاديمية مهارات لكرة القدم في حي الشفا بالرياض من المراكز الرياضية الرائدة للشباب. بقيادة المدرب القدير الكابتن أبو ريان، نقدم برامج تدريبية احترافية تركز على تنمية المهارات الفنية وصقل الشخصية الرياضية الملتزمة والقوية للاعبين.",
          desc2: "نحن نؤمن بأن كرة القدم ليست مجرد لعبة بل هي مدرسة للحياة. تساعد حصصنا التدريبية على بناء العمل الجماعي، المهارات القيادية، العادات الصحية، والقدرة على التغلب على التحديات، مما يضمن نمو أبطالنا داخل الملعب وخارجه."
        },
        contact: {
          phone: "+٩٦٦ ٥٠ ٧٣٩ ٨٨٨٨",
          address: "طريق عرفات، حي الشفا، الرياض 14713، المملكة العربية السعودية"
        }
      }
    };
  });

  const saveContent = (newContent) => {
    setContent(newContent);
    localStorage.setItem('maharat_cms_content', JSON.stringify(newContent));
  };

  const updateSection = (lang, section, data) => {
    const updated = {
      ...content,
      [lang]: {
        ...content[lang],
        [section]: {
          ...content[lang][section],
          ...data
        }
      }
    };
    saveContent(updated);
  };

  // Traverses nested objects reactively
  const getContent = (path) => {
    const keys = path.split('.');
    let value = content[language];
    for (const key of keys) {
      if (value && value[key] !== undefined) {
        value = value[key];
      } else {
        return path; // Fallback to path key string
      }
    }
    return value;
  };

  return (
    <CMSContext.Provider value={{ content, updateSection, getContent, setContent }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
