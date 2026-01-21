import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/office/$placeId')({
  component: OfficePage,
  loader: async ({ params, location }) => {
    console.log('🔍 [loader] params:', JSON.stringify(params))
    console.log('🔍 [loader] location.pathname:', location.pathname)
    
    // ⚠️ Bug reproduction: params.placeId should be populated but might be undefined/stale
    const placeId = params?.placeId
    const fallbackPlaceId = location.pathname.split('/').pop() || ''
    
    return {
      placeId,
      fallbackPlaceId,
      paramsRaw: JSON.stringify(params),
    }
  },
})

function OfficePage() {
  const { placeId, fallbackPlaceId, paramsRaw } = Route.useLoaderData()
  const params = Route.useParams()
  
  const isParamsMismatch = placeId !== fallbackPlaceId
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Office Detail Page (Reproduction)</h1>
      
      <div className="space-y-4">
        <div className={`p-4 rounded border ${isParamsMismatch ? 'bg-red-50 border-red-300' : 'bg-green-50 border-green-300'}`}>
          <h2 className="font-bold mb-2">
            {isParamsMismatch ? '❌ BUG DETECTED!' : '✅ Params OK'}
          </h2>
          {isParamsMismatch && (
            <p className="text-red-600 text-sm">
              params.placeId does not match the URL path!
            </p>
          )}
        </div>
        
        <table className="w-full border-collapse">
          <tbody>
            <tr className="border-b">
              <td className="p-2 font-medium">params.placeId (from loader)</td>
              <td className={`p-2 font-mono ${!placeId ? 'text-red-500' : ''}`}>
                {placeId || '(undefined)'}
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-medium">URL path (fallback)</td>
              <td className="p-2 font-mono">{fallbackPlaceId}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-medium">params (raw from loader)</td>
              <td className="p-2 font-mono text-xs">{paramsRaw}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-medium">useParams() in component</td>
              <td className="p-2 font-mono text-xs">{JSON.stringify(params)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
