
import { Models, type Provider, type Model } from 'treb-llm-support';

// provider/model list

export const provider_list: {
  provider: Provider, 
  models: Model[],
}[] = [];

const mm: Map<Provider, Model[]> = new Map();

for (const model of Models) {
  let check = mm.get(model.provider);
  if (check) {
    check.push(model);
  }
  else {
    mm.set(model.provider, [model]);
  }
}

for (const [provider, models] of mm.entries()) {
  models.sort((a, b) => a.name.localeCompare(b.name));
  provider_list.push({provider, models});
}

provider_list.sort((a, b) => a.provider.name.localeCompare(b.provider.name));

