import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Router Params Test</h1>
      <p className="text-gray-600">
        Click the links above to test navigation between office pages.
      </p>
      <ul className="mt-4 list-disc pl-6 text-sm text-gray-500">
        <li><span className="text-red-500">Red links</span>: Concrete URL (e.g., /office/gangnam)</li>
        <li><span className="text-blue-500">Blue links</span>: Typed route with params (e.g., /office/$placeId + params)</li>
      </ul>
    </div>
  )
}
