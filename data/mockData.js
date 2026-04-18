window.NinxMockData = (() => {
  const now = new Date();
  const daysAgo = (d) => new Date(now.getTime() - d * 86400000).toISOString();

  const models = [
    {
      id: 'bert-base-uncased',
      name: 'BERT-base-uncased',
      shortDescription: 'Classic transformer encoder for text classification and embeddings.',
      fullDescription:
        'BERT-base-uncased is widely used for NLP tasks such as sentiment analysis, token classification, and semantic search.',
      author: { name: 'Google Research', email: 'research@google.com' },
      tags: ['NLP'],
      createdAt: daysAgo(21),
      downloads: 214523,
      likes: 12590,
      files: [
        { name: 'pytorch_model.bin', size: 1200000000, url: '#' },
        { name: 'config.json', size: 6500, url: '#' },
      ],
      parameters: [
        { name: 'encoder.layer.0.attention.self.query.weight', shape: '[768, 768]', dtype: 'float32' },
        { name: 'embeddings.word_embeddings.weight', shape: '[30522, 768]', dtype: 'float32' },
      ],
      weight: '1.2 GB',
      readme:
        '# BERT-base-uncased\n\nA robust baseline for many NLP tasks.\n\n## Highlights\n- 12 layers\n- 110M trainable parameters\n- Great ecosystem support',
      usageExample:
        "from transformers import pipeline\nclf = pipeline('sentiment-analysis', model='bert-base-uncased')\nprint(clf('Ninxware is awesome!'))",
    },
    {
      id: 'stable-diffusion-v15',
      name: 'Stable Diffusion v1.5',
      shortDescription: 'Text-to-image diffusion model for creative generation workflows.',
      fullDescription:
        'Stable Diffusion v1.5 can generate high-quality images from text prompts with broad style control and high flexibility.',
      author: { name: 'CompVis', email: 'team@compvis.ai' },
      tags: ['CV', 'Multimodal'],
      createdAt: daysAgo(15),
      downloads: 440128,
      likes: 28430,
      files: [
        { name: 'model.ckpt', size: 4300000000, url: '#' },
        { name: 'vocab.json', size: 1001000, url: '#' },
      ],
      parameters: [
        { name: 'unet.down_blocks.0.attentions.0.proj_in.weight', shape: '[320, 320, 1, 1]', dtype: 'float16' },
        { name: 'vae.encoder.conv_in.weight', shape: '[128, 3, 3, 3]', dtype: 'float16' },
      ],
      weight: '4.3 GB',
      readme:
        '# Stable Diffusion v1.5\n\nGenerate images from natural language prompts.\n\n## Notes\nUse guidance scale and steps to tune output quality.',
      usageExample:
        'from diffusers import StableDiffusionPipeline\npipe = StableDiffusionPipeline.from_pretrained("runwayml/stable-diffusion-v1-5")\nimage = pipe("A futuristic city at sunrise").images[0]',
    },
    {
      id: 'whisper-small',
      name: 'Whisper-small',
      shortDescription: 'Automatic speech recognition model with multilingual support.',
      fullDescription:
        'Whisper-small transcribes audio into text with strong performance across multiple languages and robust noise handling.',
      author: { name: 'OpenAI', email: 'models@openai.com' },
      tags: ['Audio'],
      createdAt: daysAgo(11),
      downloads: 91201,
      likes: 7333,
      files: [
        { name: 'whisper-small.pt', size: 500000000, url: '#' },
        { name: 'tokenizer.json', size: 320000, url: '#' },
      ],
      parameters: [
        { name: 'encoder.conv1.weight', shape: '[384, 80, 3]', dtype: 'float32' },
        { name: 'decoder.token_embedding.weight', shape: '[51865, 768]', dtype: 'float32' },
      ],
      weight: '500 MB',
      readme:
        '# Whisper-small\n\nSpeech-to-text optimized for fast and accurate transcription.\n\n## Use Cases\n- Captions\n- Call center analytics\n- Voice interfaces',
      usageExample:
        'import whisper\nmodel = whisper.load_model("small")\nresult = model.transcribe("sample.wav")\nprint(result["text"])',
    },
    {
      id: 'llama-2-7b-chat',
      name: 'LLaMA-2-7b-chat',
      shortDescription: 'Conversational large language model for chat and assistants.',
      fullDescription:
        'LLaMA-2-7b-chat is a tuned conversational model suitable for chatbot experiences, Q&A systems, and writing copilots.',
      author: { name: 'Meta AI', email: 'opensource@meta.ai' },
      tags: ['NLP'],
      createdAt: daysAgo(8),
      downloads: 322199,
      likes: 20980,
      files: [
        { name: 'consolidated.00.pth', size: 13000000000, url: '#' },
        { name: 'tokenizer.model', size: 498000, url: '#' },
      ],
      parameters: [
        { name: 'layers.0.attention.wq.weight', shape: '[4096, 4096]', dtype: 'float16' },
        { name: 'tok_embeddings.weight', shape: '[32000, 4096]', dtype: 'float16' },
      ],
      weight: '13 GB',
      readme:
        '# LLaMA-2-7b-chat\n\nInstruction-tuned model for interactive chat.\n\n## Tips\nUse system prompts to steer persona and safety behavior.',
      usageExample:
        'from transformers import AutoTokenizer, AutoModelForCausalLM\nmodel_id = "meta-llama/Llama-2-7b-chat-hf"\ntok = AutoTokenizer.from_pretrained(model_id)\nmodel = AutoModelForCausalLM.from_pretrained(model_id)',
    },
    {
      id: 'yolov8n',
      name: 'YOLOv8n',
      shortDescription: 'Lightweight real-time object detection model for edge devices.',
      fullDescription:
        'YOLOv8n is optimized for speed while retaining competitive object detection quality for production scenarios.',
      author: { name: 'Ultralytics', email: 'team@ultralytics.com' },
      tags: ['CV'],
      createdAt: daysAgo(4),
      downloads: 184908,
      likes: 17031,
      files: [
        { name: 'yolov8n.pt', size: 6000000, url: '#' },
        { name: 'data.yaml', size: 1900, url: '#' },
      ],
      parameters: [
        { name: 'model.0.conv.weight', shape: '[16, 3, 3, 3]', dtype: 'float16' },
        { name: 'model.22.m.0.weight', shape: '[64, 64, 1, 1]', dtype: 'float16' },
      ],
      weight: '6 MB',
      readme:
        '# YOLOv8n\n\nFast object detection for edge and mobile workloads.\n\n## Recommended\nQuantize for low-latency deployments.',
      usageExample:
        'from ultralytics import YOLO\nmodel = YOLO("yolov8n.pt")\nresults = model("https://ultralytics.com/images/bus.jpg")',
    },
  ];

  return { models };
})();
