export default function CategoryFooter() {
  return (
    <footer className="w-full bg-gray-100 border-t border-gray-200 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Your App Name. All rights reserved.
      </div>
    </footer>
  );
}
