import * as mysteryBoxRepository from '../../data/repositories/mysteryBoxesRepository';

export async function getMysteryBoxes() {
  return await mysteryBoxRepository.findAllMysteryBoxes();
}

export async function getMysteryBoxById(id: number) {
  return await mysteryBoxRepository.findMysteryBoxById(id);
}
