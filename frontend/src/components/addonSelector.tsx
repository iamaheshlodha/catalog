import React, { useEffect, useState } from "react";
import type { AddOn } from "../api/types/api";

interface Props {
  addOns: AddOn[];
  selectedAddons: AddOn[];
  onAddonChange: (selectedAddons: AddOn[]) => void;
}

const AddonSelector: React.FC<Props> = ({
  addOns,
  selectedAddons,
  onAddonChange,
}) => {
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);

  useEffect(() => {
    setSelectedAddonIds(selectedAddons.map((addon) => addon.id));
  }, [selectedAddons]);

  const handleAddonToggle = (addon: AddOn) => {
    let newSelectedAddons: AddOn[];

    if (selectedAddonIds.includes(addon.id)) {
      newSelectedAddons = selectedAddons.filter((a) => a.id !== addon.id);
    } else {
      newSelectedAddons = [...selectedAddons, addon];
    }

    setSelectedAddonIds(newSelectedAddons.map((a) => a.id));
    onAddonChange(newSelectedAddons);
  };

  // Convert price to number before summing
  const getTotalAddonPrice = () =>
    selectedAddons.reduce(
      (total, addon) => total + Number(addon.price || 0),
      0
    );

  if (!addOns || addOns.length === 0) return null;

  const totalAddonPrice = getTotalAddonPrice();

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800">Add-ons</h2>
        {totalAddonPrice > 0 && (
          <span className="text-sm font-medium text-green-600">
            +₹{totalAddonPrice}
          </span>
        )}
      </div>

      <div className="space-y-2">
        {addOns.map((addon) => (
          <AddonItem
            key={addon.id}
            addon={addon}
            isSelected={selectedAddonIds.includes(addon.id)}
            onToggle={() => handleAddonToggle(addon)}
          />
        ))}
      </div>

      {selectedAddons.length > 0 && (
        <div className="p-3 mt-4 border border-blue-200 rounded-lg bg-blue-50">
          <h4 className="mb-2 font-medium text-blue-800">Selected Add-ons:</h4>
          <div className="space-y-1">
            {selectedAddons.map((addon) => (
              <div
                key={addon.id}
                className="flex justify-between text-sm text-blue-700"
              >
                <span>{addon.name}</span>
                <span>₹{Number(addon.price).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="pt-2 mt-2 border-t border-blue-300">
            <div className="flex justify-between font-medium text-blue-800">
              <span>Total Add-ons:</span>
              <span>₹{totalAddonPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface AddonItemProps {
  addon: AddOn;
  isSelected: boolean;
  onToggle: () => void;
}

const AddonItem: React.FC<AddonItemProps> = ({
  addon,
  isSelected,
  onToggle,
}) => {
  return (
    <label className="flex items-start gap-3 p-3 transition-colors border rounded-lg cursor-pointer hover:bg-gray-50">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onToggle}
        className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <span className="font-medium text-gray-900">{addon.name}</span>
            {addon.description && (
              <p className="mt-1 text-sm text-gray-600">
                {addon.description}
              </p>
            )}
          </div>
          <span className="ml-2 font-medium text-green-600">
            +₹{Number(addon.price).toFixed(2)}
          </span>
        </div>
      </div>
    </label>
  );
};

export default React.memo(AddonSelector);
