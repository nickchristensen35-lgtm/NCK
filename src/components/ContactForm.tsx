'use client';

export default function ContactForm() {
  return (
    <div className="bg-gray-50 rounded-2xl p-8">
      <h3 className="font-semibold text-xl text-gray-900 mb-6">Send us a message</h3>
      <form className="space-y-4" onSubmit={e => e.preventDefault()}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fname" className="block text-sm font-medium text-gray-700 mb-1.5">First name</label>
            <input type="text" id="fname" placeholder="Jane" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white" />
          </div>
          <div>
            <label htmlFor="lname" className="block text-sm font-medium text-gray-700 mb-1.5">Last name</label>
            <input type="text" id="lname" placeholder="Smith" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white" />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
          <input type="email" id="email" placeholder="jane@example.com" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">Phone (optional)</label>
          <input type="tel" id="phone" placeholder="04xx xxx xxx" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
          <textarea id="message" rows={4} placeholder="Tell us about your business and what you need..." className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none bg-white" />
        </div>
        <button type="submit" className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm cursor-pointer">
          Send Message
        </button>
      </form>
    </div>
  );
}
