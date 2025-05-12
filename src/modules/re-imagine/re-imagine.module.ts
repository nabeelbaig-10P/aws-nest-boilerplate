import { Module } from '@nestjs/common';
import { AutoMaskModule } from './auto-mask/auto-mask.module';
import { GardenStyleModule } from './garden-style/garden-style.module';
import { GenerateImagesModule } from './generate-images/generate-images.module';
import { YardTypesModule } from './yard-types/yard-types.module';

@Module({
    imports: [AutoMaskModule, GardenStyleModule, GenerateImagesModule, YardTypesModule],
})
export class ReImagineModule {}
