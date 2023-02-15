import { EquipmentsConfig, MaterialsConfig, SystemItemsConfig } from "@sora-all-stars/assets";
import { plainToClass } from "class-transformer";
import { validateSync } from "class-validator";

import { EquipmentItemConfig } from "./EquipmentItem";
import { MaterialItemConfig } from "./MaterialItem";
import { SystemItemConfig } from "./SystemItem";

export class ItemConfigManager {
  static systemItemConfigMap: Map<string, SystemItemConfig> = new Map();
  static materialItemConfigMap: Map<string, MaterialItemConfig> = new Map();
  static equipmentItemConfigMap: Map<string, EquipmentItemConfig> = new Map();

  static getSystemItemConfig(id: string): SystemItemConfig | null {
    return ItemConfigManager.systemItemConfigMap.get(id) ?? null;
  }

  static getMaterialItemConfig(id: string): MaterialItemConfig | null {
    return ItemConfigManager.materialItemConfigMap.get(id) ?? null;
  }

  static getEquipmentItemConfig(id: string): EquipmentItemConfig | null {
    return ItemConfigManager.equipmentItemConfigMap.get(id) ?? null;
  }

  static init() {
    ItemConfigManager.initMaterialItemConfigs();
    ItemConfigManager.initEquipmentItemConfigs();
  }

  static initSystemItemConfigs() {
    for (const config of SystemItemsConfig) {
      const currConfig = plainToClass(SystemItemConfig, config);
      const errors = validateSync(currConfig);

      if (errors.length > 0) {
        console.log(errors);
        throw new Error("Invalid system item config");
      }

      ItemConfigManager.systemItemConfigMap.set(currConfig.id, currConfig);
    }
  }

  static initMaterialItemConfigs() {
    for (const config of MaterialsConfig) {
      const currConfig = plainToClass(MaterialItemConfig, config);
      const errors = validateSync(currConfig);

      if (errors.length > 0) {
        console.log(errors);
        throw new Error("Invalid material item config");
      }

      ItemConfigManager.materialItemConfigMap.set(currConfig.id, currConfig);
    }
  }

  static initEquipmentItemConfigs() {
    for (const config of EquipmentsConfig) {
      const currConfig = plainToClass(EquipmentItemConfig, config);
      const errors = validateSync(currConfig);

      if (errors.length > 0) {
        console.log(errors);
        throw new Error("Invalid equipment item config");
      }

      ItemConfigManager.equipmentItemConfigMap.set(currConfig.id, currConfig);
    }
  }
}

(window as unknown as { ItemConfigManager: ItemConfigManager }).ItemConfigManager = ItemConfigManager;
