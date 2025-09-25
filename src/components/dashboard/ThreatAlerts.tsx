import { useEffect, useState } from "react";

type ThreatPulse = {
  id: string;
  name: string;
  description: string;
  created: string;
  author_name: string;
};

export default function ThreatFeed() {
  const [threats, setThreats] = useState<ThreatPulse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchThreats = async () => {
      try {
        const response = await fetch("https://otx.alienvault.com/api/v1/pulses/subscribed", {
          headers: {
            "X-OTX-API-KEY": import.meta.env.VITE_OTX_API_KEY || "" //  keeps the key of AlienVault OTX
          }
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        setThreats(data.results || []);
      } catch (err: any) {
        setError(err.message || "Failed to load threat feed");
      } finally {
        setLoading(false);
      }
    };

    fetchThreats();
  }, []);

  if (loading) return <p className="text-gray-500">Loading threats...</p>;
  if (error) return <p className="text-red-500">⚠️ {error}</p>;

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">🚨 Real-Time Threat Feed</h2>
      <ul className="space-y-3">
        {threats.slice(0, 10).map((t) => (
          <li key={t.id} className="p-3 border rounded-lg hover:bg-gray-50">
            <h3 className="font-semibold">{t.name}</h3>
            <p className="text-sm text-gray-600">{t.description || "No description"}</p>
            <p className="text-xs text-gray-400 mt-1">
              By {t.author_name} — {new Date(t.created).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
