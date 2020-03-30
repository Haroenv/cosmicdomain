from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils.text import slugify

# Create your models here.


class Industry(models.Model):
    name = models.CharField(max_length=300)

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(_("Tag name"), max_length=50)
    description = models.CharField(_("Tag description"), max_length=100, null=True, blank=True)

    def __str__(self):
        return self.name


class Domain(models.Model):
    name = models.CharField(_("Domain name"), max_length=120)
    price = models.CharField(_("Price"), max_length=120)
    slug = models.SlugField(_("Domain slug"), null=True, blank=True, default=None, max_length=50)
    thumbnail_image = models.FileField(_("Thumbnail image"), upload_to='domain-images/%Y/%m/%d/', null=True)
    tags = models.ManyToManyField(Tag, verbose_name=_("Tags"), related_name="domain")
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    industry = models.ForeignKey(
        Industry,
        verbose_name=_("Industry"),
        related_name="domain",
        on_delete=models.DO_NOTHING,
        null=True,
        blank=True)

    def get_related(self):

        tags = self.tags.all()

        domain_queryset = Domain.objects.filter(tags__in=tags).exclude(id=self.pk).distinct()

        domain_ids = list(map(lambda domain: domain.id, domain_queryset))

        domain_count = 3 if len(domain_ids) > 3 else len(domain_ids)

        random_domain_ids = random.sample(domain_ids, domain_count)

        queryset = Domain.objects.filter(id__in=random_domain_ids)

        return queryset

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)[:50]

        super(Domain, self).save(*args, **kwargs)

    def _str_(self):
        return self.name

    class Meta:
        verbose_name = "Domain"
        verbose_name_plural = "Domains"
