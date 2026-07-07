'use client'
import { useState } from 'react'
import { generateSlug, generateAliases } from '@/lib/slugify'

export default function AddPhonePage() {
  const [form, setForm] = useState({
    name: '',
    shortName: '',
    brand: '',
    series: '',
    modelNumber: '',
    slug: '',
    searchAliases: [] as string[],
    colorOptions: [] as string[],
  })
  const [images, setImages] = useState({
    main: null as File | null,
    back: null as File | null,
    side: null as File | null,
    gallery: [] as File[],
    colorImages: {} as Record<string, File>,
  })
  const [previews, setPreviews] = useState({
    main: '',
    back: '',
    side: '',
  })

  // Auto-fill shortName and slug when name is typed
  const handleNameChange = (value: string) => {
    const slug = generateSlug(value)
    const aliases = generateAliases(value, form.shortName, form.modelNumber, form.brand)
    setForm(prev => ({ ...prev, name: value, slug, searchAliases: aliases }))
  }

  // Image preview on file select
  const handleImageSelect = (type: string, file: File) => {
    const url = URL.createObjectURL(file)
    setPreviews(prev => ({ ...prev, [type]: url }))
    setImages(prev => ({ ...prev, [type]: file }))
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Add new phone</h1>

      {/* ── SECTION 1: NAME FIELDS ── */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 mb-6">
        <h2 className="text-base font-semibold text-slate-900 mb-4">
          Phone name & identity
        </h2>

        {/* Display Name — MOST IMPORTANT FIELD */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Display name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={e => handleNameChange(e.target.value)}
            placeholder="Samsung Galaxy A55 5G"
            className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900
                       focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <p className="text-xs text-slate-400 mt-1">
            Jo naam Pakistan mein log jante hain — jaise "Galaxy A55" ya "iPhone 15 Pro"
          </p>
        </div>

        {/* Short Name — for cards */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Short name (card mein dikhega) <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={form.shortName}
            onChange={e => setForm(prev => ({ ...prev, shortName: e.target.value }))}
            placeholder="Galaxy A55"
            className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900
                       focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
          />
        </div>

        {/* Brand + Series */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Brand <span className="text-rose-500">*</span>
            </label>
            <select
              value={form.brand}
              onChange={e => setForm(prev => ({ ...prev, brand: e.target.value }))}
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900
                         focus:border-blue-500 text-sm"
            >
              <option value="">Brand select karein</option>
              <option>Samsung</option>
              <option>Apple</option>
              <option>Xiaomi</option>
              <option>Redmi</option>
              <option>POCO</option>
              <option>Vivo</option>
              <option>Oppo</option>
              <option>Realme</option>
              <option>OnePlus</option>
              <option>Google</option>
              <option>Infinix</option>
              <option>Tecno</option>
              <option>Nokia</option>
              <option>Motorola</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Series
            </label>
            <input
              type="text"
              value={form.series}
              onChange={e => setForm(prev => ({ ...prev, series: e.target.value }))}
              placeholder="Galaxy A"
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900
                         focus:border-blue-500 text-sm"
            />
          </div>
        </div>

        {/* Model Number (optional) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Model number
            <span className="text-slate-400 font-normal ml-1">(optional — internal use)</span>
          </label>
          <input
            type="text"
            value={form.modelNumber}
            onChange={e => setForm(prev => ({ ...prev, modelNumber: e.target.value }))}
            placeholder="SM-A556B"
            className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-slate-500
                       focus:border-blue-500 text-sm"
          />
          <p className="text-xs text-slate-400 mt-1">
            Site pe nahi dikhega — sirf internal reference ke liye
          </p>
        </div>

        {/* Search Aliases */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Search aliases (auto-generated)
          </label>
          <div className="flex flex-wrap gap-2 p-3 border border-slate-200 rounded-lg bg-slate-50 min-h-[40px]">
            {form.searchAliases.map((alias, i) => (
              <span key={i}
                className="bg-blue-50 border border-blue-200 text-blue-700
                           text-xs font-medium px-2 py-1 rounded-md">
                {alias}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Ye tags search mein help karte hain — "a55", "galaxy a55" sab milenge
          </p>
        </div>

        {/* Auto-generated slug preview */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
          <span className="text-xs text-slate-400">URL:</span>
          <span className="text-sm text-blue-600 ml-2">
            mobilehub.pro/phones/{form.slug || 'phone-name-here'}
          </span>
        </div>
      </section>

      {/* ── SECTION 2: IMAGES ── */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 mb-6">
        <h2 className="text-base font-semibold text-slate-900 mb-1">Phone images</h2>
        <p className="text-sm text-slate-500 mb-4">
          Real phone ki photo upload karein — dummy icon nahi dikhega
        </p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Main image */}
          {['main', 'back', 'side'].map((type) => (
            <div key={type}>
              <label className="block text-xs font-medium text-slate-600 mb-2 uppercase
                                tracking-wide">
                {type === 'main' ? 'Front photo *' :
                 type === 'back' ? 'Back photo' : 'Side photo'}
              </label>
              <label className="block cursor-pointer">
                <div className={`border-2 border-dashed rounded-xl overflow-hidden
                  ${previews[type as keyof typeof previews]
                    ? 'border-blue-300' : 'border-slate-300 hover:border-blue-400'}
                  aspect-square flex items-center justify-center bg-slate-50`}>
                  {previews[type as keyof typeof previews] ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={previews[type as keyof typeof previews]}
                        alt={type}
                        className="w-full h-full object-contain p-2"
                      />
                    </>
                  ) : (
                    <div className="text-center p-4">
                      <div className="text-2xl text-slate-300 mb-1">+</div>
                      <div className="text-xs text-slate-400">Upload karein</div>
                      <div className="text-xs text-slate-300 mt-1">PNG, JPG, WebP</div>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => {
                    const file = e.target.files?.[0]
                    if (file) handleImageSelect(type, file)
                  }}
                />
              </label>
            </div>
          ))}
        </div>

        {/* Color variants */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Color variants
          </label>
          {form.colorOptions.map((color, i) => (
            <div key={i} className="flex items-center gap-3 mb-2">
              <input
                type="text"
                value={color}
                placeholder="Awesome Iceblue"
                className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                onChange={e => {
                  const updated = [...form.colorOptions]
                  updated[i] = e.target.value
                  setForm(prev => ({ ...prev, colorOptions: updated }))
                }}
              />
              <label className="cursor-pointer px-3 py-2 border border-slate-200 rounded-lg
                                text-sm text-slate-500 hover:border-blue-400">
                Photo upload
                <input type="file" accept="image/*" className="hidden"
                  onChange={e => {
                    const file = e.target.files?.[0]
                    if (file) setImages(prev => ({
                      ...prev,
                      colorImages: { ...prev.colorImages, [color]: file }
                    }))
                  }}
                />
              </label>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setForm(prev => ({
              ...prev,
              colorOptions: [...prev.colorOptions, '']
            }))}
            className="text-sm text-blue-600 hover:text-blue-700 mt-1"
          >
            + Color add karein
          </button>
        </div>

        {/* Gallery */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Gallery photos (optional)
          </label>
          <label className="block border-2 border-dashed border-slate-300 rounded-xl p-4
                            text-center cursor-pointer hover:border-blue-400">
            <div className="text-sm text-slate-500">Multiple gallery photos upload karein</div>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={e => {
                const files = Array.from(e.target.files || [])
                setImages(prev => ({ ...prev, gallery: files }))
              }}
            />
          </label>
        </div>
      </section>

      {/* ── SECTION 3: SUBMIT ── */}
      <div className="flex items-center justify-end gap-4 mt-8 mb-12">
        <button
          type="button"
          onClick={() => {
            if (!form.name || !form.shortName || !form.brand) {
              alert("Please fill in all required fields (Name, Short Name, Brand).");
              return;
            }
            alert("Phone saved successfully! (Mock submission)");
            window.location.href = "/admin/phones";
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-sm transition-colors"
        >
          Save Phone
        </button>
      </div>
    </div>
  )
}
