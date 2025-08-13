import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';

interface JobFiltersProps {
  filters: {
    search?: string;
    location?: string;
    remote?: string;
    category?: string;
    type?: string;
    seniority?: string;
    minSalary?: number;
    maxSalary?: number;
    datePosted?: string;
  };
  onFilterChange: (filters: Partial<JobFiltersProps['filters']>) => void;
}

export function JobFilters({ filters, onFilterChange }: JobFiltersProps) {
  const handleFilterChange = (key: keyof JobFiltersProps['filters'], value: any) => {
    onFilterChange({ [key]: value });
  };

  const employmentTypes = [
    { value: 'full-time', label: 'Full Time' },
    { value: 'part-time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' },
    { value: 'freelance', label: 'Freelance' },
  ];

  const seniorityLevels = [
    { value: 'entry', label: 'Entry Level' },
    { value: 'junior', label: 'Junior' },
    { value: 'mid', label: 'Mid Level' },
    { value: 'senior', label: 'Senior' },
    { value: 'lead', label: 'Lead' },
    { value: 'executive', label: 'Executive' },
  ];

  const locationModes = [
    { value: 'remote', label: 'Remote' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'onsite', label: 'On-site' },
  ];

  const salaryRanges = [
    { value: '0-30000', label: 'Under $30k' },
    { value: '30000-50000', label: '$30k - $50k' },
    { value: '50000-75000', label: '$50k - $75k' },
    { value: '75000-100000', label: '$75k - $100k' },
    { value: '100000-150000', label: '$100k - $150k' },
    { value: '150000+', label: '$150k+' },
  ];

  const parseSalaryRange = (rangeValue: string): [number | undefined, number | undefined] => {
    if (rangeValue.endsWith('+')) {
      const min = Number(rangeValue.slice(0, -1));
      return [isNaN(min) ? undefined : min, undefined];
    }
    const [minStr, maxStr] = rangeValue.split('-');
    const min = Number(minStr);
    const max = Number(maxStr);
    return [isNaN(min) ? undefined : min, isNaN(max) ? undefined : max];
  };

  const categories = [
    { value: 'software-development', label: 'Software Development' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'customer-support', label: 'Customer Support' },
    { value: 'product-management', label: 'Product Management' },
    { value: 'operations', label: 'Operations' },
    { value: 'finance', label: 'Finance' },
    { value: 'hr', label: 'Human Resources' },
  ];

  return (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Job Category
        </Label>
        <Select
          value={filters.category ?? 'all'}
          onValueChange={(value) => handleFilterChange('category', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Location Mode */}
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Work Location
        </Label>
        <Select
          value={filters.remote ?? 'all'}
          onValueChange={(value) => handleFilterChange('remote', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="All locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All locations</SelectItem>
            {locationModes.map((mode) => (
              <SelectItem key={mode.value} value={mode.value}>
                {mode.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Employment Type */}
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Employment Type
        </Label>
        <Select
          value={filters.type ?? 'all'}
          onValueChange={(value) => handleFilterChange('type', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            {employmentTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Seniority Level */}
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Experience Level
        </Label>
        <Select
          value={filters.seniority ?? 'all'}
          onValueChange={(value) => handleFilterChange('seniority', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="All levels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All levels</SelectItem>
            {seniorityLevels.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Salary Range */}
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-3 block">
          Salary Range
        </Label>
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minSalary || ''}
              onChange={(e) => handleFilterChange('minSalary', e.target.value ? Number(e.target.value) : undefined)}
              className="text-sm"
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxSalary || ''}
              onChange={(e) => handleFilterChange('maxSalary', e.target.value ? Number(e.target.value) : undefined)}
              className="text-sm"
            />
          </div>
          
          {/* Quick salary ranges */}
          <div className="space-y-2">
            {salaryRanges.map((range) => {
              const [min, max] = parseSalaryRange(range.value);
              const isSelected = filters.minSalary === min && filters.maxSalary === max;
              
              return (
                <div key={range.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={range.value}
                    checked={isSelected}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleFilterChange('minSalary', min);
                        handleFilterChange('maxSalary', max);
                      } else {
                        handleFilterChange('minSalary', undefined);
                        handleFilterChange('maxSalary', undefined);
                      }
                    }}
                  />
                  <Label
                    htmlFor={range.value}
                    className="text-sm text-gray-600 cursor-pointer"
                  >
                    {range.label}
                  </Label>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Separator />

      {/* Location */}
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Location
        </Label>
        <Input
          type="text"
          placeholder="City, State, or Country"
          value={filters.location || ''}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          className="text-sm"
        />
      </div>

      <Separator />

      {/* Date Posted */}
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Date Posted
        </Label>
        <Select
          value={filters.datePosted ?? 'all'}
          onValueChange={(value) => handleFilterChange('datePosted', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This week</SelectItem>
            <SelectItem value="month">This month</SelectItem>
            <SelectItem value="3months">Last 3 months</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
