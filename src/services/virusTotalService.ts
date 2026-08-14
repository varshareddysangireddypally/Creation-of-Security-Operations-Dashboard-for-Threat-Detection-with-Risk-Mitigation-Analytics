const API_KEY = import.meta.env.VITE_VIRUSTOTAL_API_KEY;

export interface VirusTotalResult {
  harmless: number;
  malicious: number;
  suspicious: number;
  undetected: number;
  timeout: number;
  status: string;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function scanURL(
  url: string
): Promise<VirusTotalResult | null> {

  if (!API_KEY) {
    console.error("VirusTotal API Key Missing");
    return null;
  }

  try {

    const form = new URLSearchParams();

    form.append("url", url);

    const submitResponse = await fetch(
      "https://www.virustotal.com/api/v3/urls",
      {
        method: "POST",
        headers: {
          "x-apikey": API_KEY,
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body: form,
      }
    );

    if (!submitResponse.ok) {

      console.error(await submitResponse.text());

      return null;

    }

    const submitData = await submitResponse.json();

    const analysisId = submitData.data.id;
        // Poll VirusTotal (Max 10 Attempts)

    for (let i = 0; i < 10; i++) {

      await sleep(3000);

      const analysisResponse = await fetch(

        `https://www.virustotal.com/api/v3/analyses/${analysisId}`,

        {
          headers: {
            "x-apikey": API_KEY,
          },
        }

      );

      if (!analysisResponse.ok) {

        continue;

      }

      const analysisData = await analysisResponse.json();

      const attributes = analysisData.data.attributes;

      if (attributes.status === "queued") {

        continue;

      }

      if (attributes.status === "running") {

        continue;

      }

      if (attributes.status === "completed") {

        const stats = attributes.stats;

        return {

          harmless: stats.harmless ?? 0,

          malicious: stats.malicious ?? 0,

          suspicious: stats.suspicious ?? 0,

          undetected: stats.undetected ?? 0,

          timeout: stats.timeout ?? 0,

          status: "completed",

        };

      }

    }
        // Analysis not completed after polling

    return {

      harmless: 0,

      malicious: 0,

      suspicious: 0,

      undetected: 0,

      timeout: 0,

      status: "pending",

    };

  } catch (err) {

    console.error("VirusTotal Error:", err);

    return {

      harmless: 0,

      malicious: 0,

      suspicious: 0,

      undetected: 0,

      timeout: 0,

      status: "error",

    };

  }

}